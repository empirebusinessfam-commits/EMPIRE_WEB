import express from 'express';
import cors from 'cors';
import { Resend } from 'resend'; // Swapped out nodemailer for Resend

const app = express();

// --- SECURITY & CORS CONFIGURATION ---
app.use(cors({
  origin: 'https://empirebusinessfamily.com',
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
// 2. COMMAND CENTER ALERTS (SMS via Resend HTTP API)
// ==========================================
// Replace 're_your_actual_key_here' with the API key from your Resend Dashboard
const resend = new Resend(process.env.RESEND_API_KEY); 

app.post('/api/send-text', async (req, res) => {
  console.log("--- PING REQUEST RECEIVED ---"); 
  const { phone, carrierGateway, message } = req.body;

  console.log("Data:", { phone, carrierGateway, message });

  if (!phone || !carrierGateway || !message) {
    console.error("Validation failed: Missing fields"); 
    return res.status(400).json({ success: false, error: 'Missing phone, carrierGateway, or message.' });
  }

  const targetEmail = `${phone}@${carrierGateway}`;
  console.log("Targeting:", targetEmail); 

  try {
    console.log("Attempting to send via Resend API..."); 
    
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's default free tier sending address
      to: targetEmail,
      subject: 'EBF Alert',
      text: message
    });

    console.log(`Success! Alert sent to ${phone}`);
    res.status(200).json({ success: true, message: 'Text reminder dispatched!' });
  } catch (error) {
    console.error('--- RESEND API DISPATCH FAILED ---');
    console.error('Full Error Object:', error); 
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