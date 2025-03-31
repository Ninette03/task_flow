import admin from "firebase-admin";
import dotenv from 'dotenv';

dotenv.config();
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');


//Initializing Firebase Admin

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey
    })
});

export default firebaseAdmin;