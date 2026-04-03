import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, Phone, CheckCircle, Clock3 } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'elena123') {
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      alert(t('admin.wrong_pass'));
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nude/20">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-dark">{t('admin.login_title')}</h2>
          <div className="mb-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('admin.password_ph')}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-start"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors">
            {t('admin.login_btn')}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nude/20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark">{t('admin.title')}</h1>
          <button onClick={fetchBookings} className="text-primary font-medium hover:underline">
            {t('admin.refresh')}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">{t('admin.loading')}</div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start">
                <thead className="bg-nude text-dark">
                  <tr>
                    <th className="px-6 py-4 font-bold text-start">{t('admin.th_client')}</th>
                    <th className="px-6 py-4 font-bold text-start">{t('admin.th_phone')}</th>
                    <th className="px-6 py-4 font-bold text-start">{t('admin.th_service')}</th>
                    <th className="px-6 py-4 font-bold text-start">{t('admin.th_date')}</th>
                    <th className="px-6 py-4 font-bold text-start">{t('admin.th_status')}</th>
                    <th className="px-6 py-4 font-bold text-start">{t('admin.th_actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-start">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-dark">{booking.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-start" dir="ltr">
                        <div className="flex items-center justify-start gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{booking.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-start">{booking.service}</td>
                      <td className="px-6 py-4 text-start">
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-start">
                        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> : <Clock3 className="w-3 h-3" />}
                          {booking.status === 'confirmed' ? t('admin.status_confirmed') : t('admin.status_pending')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-start">
                        {booking.status !== 'confirmed' && (
                          <button 
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="bg-primary/10 text-primary-dark hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            {t('admin.action_approve')}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                        {t('admin.no_bookings')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
