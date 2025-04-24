import { storage, db } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, orderBy, limit, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutLog } from '../types/fitness';

export interface ProgressPhoto {
  id: string;
  userId: string;
  url: string;
  date: string;
  notes?: string;
  mood?: 'great' | 'good' | 'neutral' | 'bad';
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  tags?: string[];
  aiAnalysis?: {
    score: number;
    feedback: string;
    improvements?: string[];
  };
}

export const uploadProgressPhoto = async (userId: string, file: File): Promise<ProgressPhoto> => {
  // Upload file to storage
  const storageRef = ref(storage, `progress-photos/${userId}/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  // Create document in Firestore
  const photoData = {
    userId,
    url,
    date: new Date().toISOString(),
    notes: '',
    mood: 'neutral' as const
  };

  const docRef = await addDoc(collection(db, 'progress-photos'), photoData);
  
  return {
    id: docRef.id,
    ...photoData
  };
};

export const getProgressPhotos = async (userId: string): Promise<ProgressPhoto[]> => {
  const q = query(
    collection(db, 'progress-photos'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ProgressPhoto[];
};

export const deleteProgressPhoto = async (userId: string, photoId: string): Promise<void> => {
  // Get photo document
  const photoDoc = await getDoc(doc(db, 'progress-photos', photoId));
  if (!photoDoc.exists()) {
    throw new Error('Photo not found');
  }

  const photoData = photoDoc.data() as ProgressPhoto;
  if (photoData.userId !== userId) {
    throw new Error('Unauthorized');
  }

  // Delete from storage
  const storageRef = ref(storage, photoData.url);
  await deleteObject(storageRef);

  // Delete from Firestore
  await deleteDoc(doc(db, 'progress-photos', photoId));
};

export const updateProgressPhoto = async (
  userId: string,
  photoId: string,
  updates: Partial<ProgressPhoto>
): Promise<ProgressPhoto> => {
  const photoRef = doc(db, 'progress-photos', photoId);
  const photoDoc = await getDoc(photoRef);

  if (!photoDoc.exists()) {
    throw new Error('Photo not found');
  }

  const photoData = photoDoc.data() as ProgressPhoto;
  if (photoData.userId !== userId) {
    throw new Error('Unauthorized');
  }

  await updateDoc(photoRef, updates);

  return {
    ...photoData,
    ...updates,
    id: photoId
  };
};

export const getProgressTimeline = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<{
  photos: ProgressPhoto[];
  workouts: WorkoutLog[];
}> => {
  try {
    const [photosSnapshot, workoutsSnapshot] = await Promise.all([
      getDocs(query(
        collection(db, 'progress-photos'),
        where('userId', '==', userId),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'desc')
      )),
      getDocs(query(
        collection(db, 'workout_logs'),
        where('userId', '==', userId),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'desc')
      ))
    ]);

    return {
      photos: photosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      })) as ProgressPhoto[],
      workouts: workoutsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      })) as WorkoutLog[]
    };
  } catch (error) {
    console.error('Error fetching progress timeline:', error);
    throw new Error('Failed to fetch progress timeline');
  }
}; 