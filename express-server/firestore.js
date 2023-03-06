'use strict';

const FireStore = require('firebase-admin');

const db = FireStore.initializeApp({
    apiKey: "AIzaSyBSal0IsBhwXJI-6u8LbPPgR_KLCwMIM6U",
    authDomain: "fitcheck-b023b.firebaseapp.com",
    projectId: "fitcheck-b023b",
    storageBucket: "fitcheck-b023b.appspot.com",
    messagingSenderId: "13443459137",
    appId: "1:13443459137:web:ebb9bd5bc9c13c77683ec0",
    measurementId: "G-G647WKTTM7"
  }).firestore();

module.exports = db;