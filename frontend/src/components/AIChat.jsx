import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2, User, Bot, Phone } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

// Component constants
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const WHATSAPP_PHONE = '9720534611370';

export default function AIChat() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Initialize Gemini
  const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Accessibility: Handle Escape key to close chat
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Initial welcome message - updates when language changes if it's the only message
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([
        { 
          role: 'assistant', 
          content: t('chat.welcome')
        }
      ]);
    }
  }, [i18n.language, t]); // Removed messages.length to allow update on lang change

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    
    setInput('');
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);

    if (!GEMINI_API_KEY) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: t('chat.missing_key')
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const SYSTEM_PROMPT = `You are the personal AI assistant for Elena Epshtein's premium nail studio "Elena Nails Design" in Ashdod, Israel.
          - Your personality: Professional, elegant, welcoming, and expert in nail care.
          - Knowledge areas: Manicure (classic, hardware, combined), Anatomic structure, Gel polish, Medical Pedicure, Nail hygiene, recovery, and trends.
          - Core Rule: Always be helpful but emphasize that for any complex issue or for the best aesthetic results, the user should book an appointment with Elena.
          - Language: Always respond in the language the user speaks (${i18n.language === 'he' ? 'Hebrew' : i18n.language === 'ru' ? 'Russian' : 'English'}).
          - Hygiene: Emphasize that Elena uses the highest medical-grade sterilization (Autoclave) which is why she is the safest choice in Ashdod.
          - Call to Action: Frequently suggest booking a consultation or a treatment directly through the "Book Now" page or WhatsApp.
          - Contact Info: Studio Phone: 053-461-1370. Location: Ashdod.
          - If asked about prices, refer them to the "Services" page on the website.
          - Keep responses concise but "luxury" in feel. Use emojis appropriately (💅, ✨, 💎).`;
      // Combine instructions with the FIRST user message in history
      // 1. Filter out any leading assistant messages from history
      // Gemini requires the conversation to start with a 'user' role.
      const conversationMessages = [...newMessages];
      while (conversationMessages.length > 0 && conversationMessages[0].role === 'assistant') {
        conversationMessages.shift();
      }

      // 2. Map exactly as required by the @google/generative-ai SDK
      const geminiHistory = conversationMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      // 3. Inject instructions to the FIRST user message
      // This is the most reliable way to enforce persona without v1beta fields.
      if (geminiHistory.length > 0 && geminiHistory[0].role === 'user') {
        geminiHistory[0].parts[0].text = `Persona/Instructions: ${SYSTEM_PROMPT}\n\nClient Message: ${geminiHistory[0].parts[0].text}`;
      }

      const MODEL_NAME = "gemini-2.5-flash";

      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const result = await model.generateContent({ contents: geminiHistory });
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (err) {
      console.error('Chat Error:', err);
      const errorMessage = err.message || '';
      const isHebrew = i18n.language === 'he';

      if (errorMessage.includes('403') || errorMessage.includes('PERMISSION_DENIED')) {
        setError(isHebrew 
          ? 'שגיאת הרשאה: וודאי שהמפתח מוגדר נכון לדומיין בהגדרות Google Cloud.' 
          : 'Authorization Error: Ensure your API Key is restricted correctly in Google Cloud.');
      } else {
        setError(isHebrew 
          ? `חלה שגיאה בחיבור ל-AI. נסי שוב מאוחר יותר.` 
          : `Failed to connect to AI. Please try again later.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "סגור צ'אט" : "פתח צ'אט עם העוזרת הוירטואלית"}
        aria-expanded={isOpen}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-primary dark:bg-primary-dark rounded-full shadow-luxury-hover flex items-center justify-center text-white cursor-pointer group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare size={28} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles size={12} className="text-gold fill-gold" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-4 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-[420px] h-[600px] md:h-[700px] bg-white/98 dark:bg-stone-900/98 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/40 dark:border-white/5 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary-dark to-primary p-7 flex items-center justify-between shadow-soft">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
                  <Sparkles size={24} className="text-white drop-shadow-md" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-[0.2em] uppercase">
                    {t('chat.title')}
                  </h3>
                  <span className="text-[11px] font-medium opacity-90 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    {t('chat.status')}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="סגור חלון צ'אט"
                className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-all group"
              >
                <X size={20} className="text-white/80 group-hover:text-white group-hover:scale-110" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-primary/10 bg-stone-50/30 dark:bg-transparent"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
                      msg.role === 'user' ? 'bg-primary-dark' : 'bg-white dark:bg-stone-800'
                    }`}>
                      {msg.role === 'user' 
                        ? <User size={14} className="text-white" /> 
                        : <Sparkles size={14} className="text-primary-dark" />
                      }
                    </div>
                    <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-soft ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white dark:bg-stone-800 text-dark dark:text-white rounded-tl-none border border-black/5 dark:border-white/5'
                    }`}>
                      <ReactMarkdown className="markdown-chat whitespace-pre-wrap">
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 border border-black/5 shadow-soft">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider text-primary-dark uppercase">{t('chat.thinking')}</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-center text-[11px] text-red-500 font-bold bg-red-50 dark:bg-red-950/20 py-3 px-4 rounded-2xl border border-red-100 dark:border-red-900/50">
                  {error}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-7 bg-white dark:bg-stone-900 border-t border-black/5 dark:border-white/5">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chat.placeholder')}
                  className="w-full bg-stone-50 dark:bg-stone-800/50 border border-black/5 dark:border-white/5 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  aria-label="שלח הודעה"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-primary-dark rounded-xl flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-5 flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">AI • Premium Concierge</p>
                </div>
                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  className="flex items-center gap-2 text-[11px] font-bold text-primary-dark hover:text-primary transition-colors underline-offset-4 hover:underline"
                >
                  <Phone size={12} />
                  {t('chat.talk_direct')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
