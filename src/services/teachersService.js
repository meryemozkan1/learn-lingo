import { get, ref } from 'firebase/database';
import { db } from './firebase';
import localTeachers from '../data/teachers.json';

/**
 * Realtime Database'den veya yerel teachers.json veri kaynağından
 * tüm öğretmen listesini çeker.
 */
export const fetchTeachers = async () => {
  try {
    let teachersRef = ref(db);

    // Firebase 2.5 saniye içinde yanıt vermezse yerel veriye geç
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firebase RTDB timeout')), 2500)
    );

    let snapshot = await Promise.race([get(teachersRef), timeoutPromise]);

    // Kök düğümde veri yoksa 'teachers' alt düğümünü kontrol et
    if (!snapshot.exists() || !snapshot.val()) {
      teachersRef = ref(db, 'teachers');
      snapshot = await Promise.race([get(teachersRef), timeoutPromise]);
    }

    if (!snapshot.exists() || !snapshot.val()) {
      console.warn('⚠️ Firebase veritabanı boş, yerel teachers.json yükleniyor.');
      return localTeachers.map((t) => ({ ...t, id: String(t.id) }));
    }

    let data = snapshot.val();
    if (data && typeof data === 'object' && data.teachers && !Array.isArray(data)) {
      data = data.teachers;
    }

    const entries = Object.entries(data);
    return entries.map(([key, value]) => ({
      ...value,
      id: String(value?.id ?? key),
    }));
  } catch (error) {
    console.warn('⚠️ Firebase bağlantı hatası, yerel teachers.json kullanılıyor:', error.message);
    return localTeachers.map((t) => ({ ...t, id: String(t.id) }));
  }
};
