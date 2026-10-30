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

async function seed() {
  try {
    if (!firebaseConfig.databaseURL) {
      throw new Error(
        'VITE_FIREBASE_DATABASE_URL ortam değişkeni tanımlı değil. Lütfen .env.local dosyanızı kontrol edin.'
      );
    }

    console.log('🔄 Firebase bağlantısı başlatılıyor...');
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app, firebaseConfig.databaseURL);

    const dataPath = join(__dirname, '../src/data/teachers.json');
    const teachers = JSON.parse(readFileSync(dataPath, 'utf-8'));

    console.log(
      `📤 ${teachers.length} öğretmen Firebase Realtime Database kök düğümüne ('/') yükleniyor...`
    );

    // teachers.json doğrudan kök dizine yüklenir (Firebase Console Import JSON ile aynı yapı)
    const uploadPromise = set(ref(db), teachers);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              `Firebase Realtime Database bağlantısı zaman aşımına uğradı (${firebaseConfig.databaseURL}).\n` +
                "Lütfen Firebase Console'da Realtime Database'in oluşturulduğundan ve Kurallar (Rules) kısmında yazma izninin açık olduğundan emin olun."
            )
          ),
        15000
      )
    );

    await Promise.race([uploadPromise, timeoutPromise]);

    console.log(`✅ ${teachers.length} öğretmen başarıyla Firebase Realtime Database'e yüklendi.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Firebase seed işlemi sırasında hata:', error.message || error);
    process.exit(1);
  }
}

seed();
