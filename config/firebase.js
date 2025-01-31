  const admin = require('firebase-admin');
  const serviceAccount = require('./guardx-95fed-firebase-adminsdk-fbsvc-3037145fdf.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://guardx-95fed-default-rtdb.firebaseio.com",
  });

  const db = admin.firestore();

  module.exports = { admin, db };
