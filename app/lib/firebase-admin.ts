import admin from 'firebase-admin';

// This path goes up from app/lib to the project root
import serviceAccount from '../../serviceAccountKey.json';

// Initialize the Firebase Admin App (only if it hasn't been already)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

// Export the initialized admin instance of Firestore
export const adminDb = admin.firestore();