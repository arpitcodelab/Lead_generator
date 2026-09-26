const dns = require('dns');
try { dns.setDefaultResultOrder('ipv4first'); } catch (e) {}

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const env = require('./config/env');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const { seedDatabase } = require('./services/seedService');
const { recoverInterruptedCampaigns } = require('./services/jobQueueService');

// Route imports
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const leadRoutes = require('./routes/leadRoutes');
const auditRoutes = require('./routes/auditRoutes');
const outreachRoutes = require('./routes/outreachRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Connect to Database & Seed Initial Data
connectDB().then(async () => {
  try {
    await seedDatabase();
  } catch (seedErr) {
    console.warn('[Seed Startup Warning]:', seedErr.message);
  }
  // Automatically recover any campaigns that were interrupted during restart
  try {
    await recoverInterruptedCampaigns();
  } catch (recErr) {
    console.warn('[Campaign Recovery Warning]:', recErr.message);
  }
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl, Postman)
    if (!origin) return callback(null, true);
    // Allow localhost, 127.0.0.1, and any github.io domain
    if (
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('github.io') ||
      (env.clientUrl && origin === env.clientUrl)
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Apply general API rate limiting
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'PDC Lead Intelligence API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/outreach', outreachRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/logs', logRoutes);

// Centralized Error Handling
app.use(errorHandler);

const server = app.listen(env.port, () => {
  console.log(`=======================================================`);
  console.log(`  PIXIE DIGITAL CREATIVES (PDC) Lead Intelligence API  `);
  console.log(`  Running on port: ${env.port} | Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=======================================================`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});
