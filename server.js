if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const hackRoutes = require('./hacks/hacks.routes.js');
const usersRoutes = require('./users/users.routes.js');

const app = express();

// 1. CORS first
app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://macgyver-5a0a0.firebaseapp.com',
    'https://macgyver-5a0a0.web.app'  // Firebase gives you both URLs
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Mongoose settings
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// 3. Middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Routes
app.use('/hacks', hackRoutes);
app.use('/users', usersRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is alive!");
});

let server;

async function runServer(dbUrl) {  // Add dbUrl parameter here
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

  const PORT = process.env.PORT || 1212;
    server = app.listen(PORT, () => {
      console.log(`Magic is happening on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    throw err;
  }
}

function closeServer() {
  return mongoose
    .disconnect()
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
}

if (require.main === module) {
  const dbUrl = process.env.MONGODB_URI;
  
  console.log('Checking MONGODB_URI:', dbUrl ? 'Found' : 'NOT FOUND');
  console.log('First 20 chars:', dbUrl ? dbUrl.substring(0, 20) : 'N/A');
  
  if (!dbUrl) {
    console.error('MONGODB_URI environment variable is not set!');
    console.error('Available env vars:', Object.keys(process.env).join(', '));
    process.exit(1);
  }
  
  runServer(dbUrl).catch((err) => {
    console.log(err);
  });
}

module.exports = {app, runServer, closeServer};