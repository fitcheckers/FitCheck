'use strict';

const FireStore = require('firebase-admin');

require('dotenv').config();

const CONFIG = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.API_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const db = FireStore.initializeApp(CONFIG).firestore();

module.exports = db;