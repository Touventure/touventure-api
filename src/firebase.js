// Firebase
const admin = require('firebase-admin');
const credentials = require('../key.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// access firestore
const db = admin.firestore();

module.exports = db;
