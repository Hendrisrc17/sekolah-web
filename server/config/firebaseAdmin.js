import admin from 'firebase-admin';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

let app;
export function getAdminApp() {
  if (app) return app;
  let credential;
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PROJECT_ID) {
    credential = admin.credential.cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') });
  } else {
    const configuredPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const localPath = path.resolve(process.cwd(), 'website-sekoalah-firebase-adminsdk-fbsvc-1c8b6bdb11.json');
    const credentialPath = configuredPath ? path.resolve(process.cwd(), configuredPath) : localPath;
    if (!fs.existsSync(credentialPath)) {
      throw new Error('Kredensial Firebase Admin belum tersedia. Isi FIREBASE_* atau GOOGLE_APPLICATION_CREDENTIALS.');
    }
    const serviceAccount = JSON.parse(fs.readFileSync(credentialPath, 'utf8'));
    credential = admin.credential.cert(serviceAccount);
  }
  app = admin.apps.length ? admin.apps[0] : admin.initializeApp({ credential });
  return app;
}
export const db = () => getAdminApp() && admin.firestore();
export const auth = () => getAdminApp() && admin.auth();
export { admin };
