import { firestore } from '../firebase'; // Ensure this import is correct
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot, 
  CollectionReference, 
  DocumentData,
  Firestore 
} from 'firebase/firestore';
import { InventoryItem } from '../utils/types';

const ensureFirestore = (): Firestore => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }
  return firestore;
};

const getInventory = async (userId: string): Promise<InventoryItem[]> => {
  const firestoreInstance = ensureFirestore();

  try {
    const inventoryCollection: CollectionReference<DocumentData> = collection(firestoreInstance, 'users', userId, 'inventory');
    const snapshot = await getDocs(inventoryCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InventoryItem));
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  } 
};

const addItem = async (userId: string, name: string, count: number): Promise<InventoryItem> => {
  const firestoreInstance = ensureFirestore();

  try {
    const inventoryCollection: CollectionReference<DocumentData> = collection(firestoreInstance, 'users', userId, 'inventory');
    const docRef = await addDoc(inventoryCollection, { name, count });
    return { id: docRef.id, name, count };
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

const deleteItem = async (userId: string, id: string): Promise<void> => {
  const firestoreInstance = ensureFirestore();

  try {
    const inventoryDoc = doc(firestoreInstance, 'users', userId, 'inventory', id);
    await deleteDoc(inventoryDoc);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

const updateItem = async (userId: string, id: string, name: string, count: number): Promise<void> => {
  const firestoreInstance = ensureFirestore();

  try {
    const inventoryDoc = doc(firestoreInstance, 'users', userId, 'inventory', id);
    await updateDoc(inventoryDoc, { name, count });
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

const subscribeToInventoryUpdates = (userId: string, callback: (items: InventoryItem[]) => void) => {
  const firestoreInstance = ensureFirestore();

  try {
    const inventoryCollection: CollectionReference<DocumentData> = collection(firestoreInstance, 'users', userId, 'inventory');
    const unsubscribe = onSnapshot(inventoryCollection, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InventoryItem));
      callback(items);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to inventory updates:', error);
    throw error;
  }
};

export const InventoryService = { getInventory, addItem, deleteItem, updateItem, subscribeToInventoryUpdates };
