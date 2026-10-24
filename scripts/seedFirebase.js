import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const teachers = JSON.parse(
  readFileSync(join(__dirname, '../src/data/teachers.json'), 'utf-8')
);

const teachersMap = {};
teachers.forEach((teacher) => {
  teachersMap[teacher.id] = teacher;
});

await set(ref(db, 'teachers'), teachersMap);
console.log(`✅ ${teachers.length} teachers uploaded to Firebase Realtime Database.`);
process.exit(0);
