const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Mock SMS sender helper
const sendMockSms = (phone, text) => {
  console.log(`\n========================================`);
  console.log(`[MOCK SMS] To: ${phone}`);
  console.log(`[Message]: ${text}`);
  console.log(`========================================\n`);
};

// --- ROUTES ---

// GET /api/bookings (Admin Route)
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/bookings (Create a booking)
app.post('/api/bookings', (req, res) => {
  const { name, phone, service, date, time } = req.body;
  
  if (!name || !phone || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO bookings (name, phone, service, date, time) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [name, phone, service, date, time], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Simulate sending SMS to Admin
    sendMockSms('+972501234567', `[מערכת אלנה] התקבלה בקשת תור חדשה מ-${name} (${phone}) ל-${service} ב-${date} ${time}`);
    
    res.status(201).json({ id: this.lastID, message: 'Booking created successfully' });
  });
});

// PATCH /api/bookings/:id/status (Admin route to update status)
app.patch('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run('UPDATE bookings SET status = ? WHERE id = ?', [status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Booking not found' });
    
    // Fetch the booking details to send SMS
    db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, row) => {
      if (row && status === 'confirmed') {
        const formattedDate = new Date(row.date).toLocaleDateString('he-IL');
        sendMockSms(row.phone, `היי ${row.name}, התור שלך ל-${row.service} אצל אלנה דיזיין אושר ל-${formattedDate} בשעה ${row.time}. נתראה!`);
      }
      res.json({ message: 'Status updated successfully' });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
