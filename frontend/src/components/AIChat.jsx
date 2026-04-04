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
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
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
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are the personal AI assistant for Elena Epshtein's premium nail studio "Elena Nails Design" in Ashdod, Israel.
          - Your personality: Professional, elegant, welcoming, and expert in nail care.
          - Knowledge areas: Manicure (classic, hardware, combined), Anatomic structure, Gel polish, Medical Pedicure, Nail hygiene, recovery, and trends.
          - Core Rule: Always be helpful but emphasize that for any complex issue or for the best aesthetic results, the user should book an appointment with Elena.
          - Language: Always respond in the language the user speaks (${i18n.language === 'he' ? 'Hebrew' : i18n.language === 'ru' ? 'Russian' : 'English'}).
          - Hygiene: Emphasize that Elena uses the highest medical-grade sterilization (Autoclave) which is why she is the safest choice in Ashdod.
          - Call to Action: Frequently suggest booking a consultation or a treatment directly through the "Book Now" page or WhatsApp.
          - Contact Info: Studio Phone: 053-461-1370. Location: Ashdod.
          - If asked about prices, refer them to the "Services" page on the website.
          - Keep responses concise but "luxury" in feel. Use emojis appropriately (💅, ✨, 💎).`
      });

      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      // Gemini requires the first message in history to be from 'user'.
      // If our first message is the 'assistant' welcome message, we skip it for the API.
      if (history.length > 0 && history[0].role === 'model') {
        history.shift();
      }

      const chat = model.startChat({ history });

      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (err) {
      console.error('Chat Error:', err);
      // Detailed error reporting for debugging
      const errorMessage = err.message || '';
      if (errorMessage.includes('403') || errorMessage.includes('PERMISSION_DENIED')) {
        setError(i18n.language === 'he' 
          ? `שגיאת הרשאה (403): וודאי שהמפתח מוגבל נכון לדומיין. שגיאה: ${errorMessage}` 
          : `Auth Error (403): Check domain restriction. Detail: ${errorMessage}`);
      } else if (errorMessage.includes('API_KEY_INVALID')) {
        setError(i18n.language === 'he' ? 'המפתח שהוזן אינו תקין.' : 'Invalid API Key.');
      } else {
        setError(`${t('chat.error')} (${errorMessage.substring(0, 50)}...)`);
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
            className="fixed bottom-28 right-4 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-[400px] h-[550px] md:h-[600px] glass-luxury dark:bg-black/60 rounded-[2.5rem] shadow-luxury-hover border border-white/40 dark:border-white/5 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary dark:bg-primary-dark p-6 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase">
                    {t('chat.title')}
                  </h3>
                  <span className="text-[10px] opacity-70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    {t('chat.status')}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary/20"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`shadow-sm flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-primary dark:text-primary-dark" />}
                    </div>
                    <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary/10 text-dark dark:text-white rounded-tr-none' 
                        : 'bg-white dark:bg-white/5 text-dark dark:text-white rounded-tl-none border border-black/5 dark:border-white/5'
                    }`}>
                      <ReactMarkdown className="markdown-chat">
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-white/5 p-4 rounded-3xl rounded-tl-none flex items-center gap-2 border border-black/5">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-xs text-gray-400">{t('chat.thinking')}</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-center text-[10px] text-red-500 font-bold bg-red-50 dark:bg-red-950/20 py-2 rounded-xl border border-red-100 dark:border-red-900/50">
                  {error}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white/50 dark:bg-black/40 backdrop-blur-md border-t border-black/5 dark:border-white/5">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chat.placeholder')}
                  className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none focus:border-primary transition-all dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center px-2">
                <p className="text-[9px] text-gray-400 font-medium tracking-tight">AI Assistance • Powered by Gemini</p>
                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  <Phone size={10} />
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
