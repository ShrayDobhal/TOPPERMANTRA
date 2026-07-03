const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Initialize Cron Jobs
const initCustodianBot = require('./src/cron/custodianBot');
initCustodianBot();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/user', require('./src/routes/user.routes'));
app.use('/api/onboarding', require('./src/routes/onboarding.routes'));
app.use('/api/dashboard', require('./src/routes/dashboard.routes'));
app.use('/api/cohort', require('./src/routes/cohort.routes'));
app.use('/api/projects', require('./src/routes/projects.routes'));
app.use('/api/community', require('./src/routes/community.routes'));

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running normally.' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Centralized Error Handler
app.use(require('./src/middlewares/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
