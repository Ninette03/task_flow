import admin from "firebase-admin";
import dotenv from 'dotenv';

dotenv.config();

//Initializing Firebase Admin

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
    })
});

export default firebaseAdmin;