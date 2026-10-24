import {
  endBefore,
  get,
  limitToLast,
  orderByKey,
  query,
  ref,
  startAfter,
  limitToFirst,
} from 'firebase/database';
import { db } from './firebase';

const PAGE_SIZE = 4;

export const fetchTeachersPage = async (lastKey = null) => {
  const teachersRef = ref(db, 'teachers');

  const q = lastKey
    ? query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(PAGE_SIZE))
    : query(teachersRef, orderByKey(), limitToFirst(PAGE_SIZE));

  const snapshot = await get(q);

  if (!snapshot.exists()) {
    return { teachers: [], nextKey: null, hasMore: false };
  }

  const data = snapshot.val();
  const teachers = Object.entries(data).map(([key, value]) => ({
    ...value,
    id: key,
  }));

  const nextKey = teachers.length === PAGE_SIZE ? teachers[teachers.length - 1].id : null;
  const hasMore = teachers.length === PAGE_SIZE;

  return { teachers, nextKey, hasMore };
};
