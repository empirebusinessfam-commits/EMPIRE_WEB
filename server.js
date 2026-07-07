import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// --- SECURITY & CORS CONFIGURATION ---
// Configured to allow requests specifically from your live domain
app.use(cors({
  origin: 'https://embirebusinessfamily.com',
  methods: ['POST', 'GET'],
  credentials: true
}));

app.use(express.json());

// ==========================================
// 1. UNIVERSAL VAULT (Task Management)
// ==========================================
let universalTasks = [
  { name: 'Shaq&Kobe Mode' },
  { name: 'Empire Radio Mix' }
];

app.get('/', (req, res) => {
  res.send('Empire Business Family: Universal Vault is Online.');
});

app.get('/api/tasks', (req, res) => {
  res.json(universalTasks);
});

app.post('/api/tasks', (req, res) => {
  universalTasks = req.body; 
  res.json({ message: "Universal Vault Updated" });
});

// ==========================================
// 2. COMMAND CENTER ALERTS (SMS via SMTP)
// ==========================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sami@versawear.org', 
    pass: 'pmpbolxdtowaccxz' 
  }
});

app.post('/api/send-text', async (req, res) => {
  console.log("--- PING REQUEST RECEIVED ---"); // ADD THIS
  const { phone, carrierGateway, message } = req.body;

  // Debugging: See exactly what the frontend is sending
  console.log("Data:", { phone, carrierGateway, message });

  if (!phone || !carrierGateway || !message) {
    console.error("Validation failed: Missing fields"); // ADD THIS
    return res.status(400).json({ success: false, error: 'Missing phone, carrierGateway, or message.' });
  }

  const targetEmail = `${phone}@${carrierGateway}`;
  console.log("Targeting:", targetEmail); // ADD THIS

  const mailOptions = {
    from: 'sami@versawear.org',
    to: targetEmail,
    subject: 'EBF Alert',
    text: message
  };

  try {
    console.log("Attempting to send email..."); // ADD THIS
    await transporter.sendMail(mailOptions);
    console.log(`Success! Alert sent to ${phone}`);
    res.status(200).json({ success: true, message: 'Text reminder dispatched!' });
  } catch (error) {
    console.error('--- SMTP DISPATCH FAILED ---');
    console.error('Full Error Object:', error); // This is the crucial part
    res.status(500).json({ success: false, error: 'Failed to send alert.' });
  }
});

// ==========================================
// 3. SERVER INITIALIZATION
// ==========================================
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Empire Universal Server running at http://localhost:${PORT}`);
});