// app/services/InventoryService.tsx

import { firestore } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot, 
  CollectionReference, 
  DocumentData 
} from 'firebase/firestore';
import { InventoryItem } from '../utils/types';

const getInventory = async (): Promise<InventoryItem[]> => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryCollection: CollectionReference<DocumentData> = collection(firestore, 'inventory');
  const snapshot = await getDocs(inventoryCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InventoryItem));
};

const addItem = async (name: string, count: number): Promise<InventoryItem> => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryCollection: CollectionReference<DocumentData> = collection(firestore, 'inventory');
  const docRef = await addDoc(inventoryCollection, { name, count });
  return { id: docRef.id, name, count };
};

const deleteItem = async (id: string): Promise<void> => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryDoc = doc(firestore, 'inventory', id);
  await deleteDoc(inventoryDoc);
};

const updateItem = async (id: string, name: string, count: number): Promise<void> => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryDoc = doc(firestore, 'inventory', id);
  await updateDoc(inventoryDoc, { name, count });
};

// Implement the subscribeToInventoryUpdates method
const subscribeToInventoryUpdates = (callback: (items: InventoryItem[]) => void) => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryCollection: CollectionReference<DocumentData> = collection(firestore, 'inventory');
  const unsubscribe = onSnapshot(inventoryCollection, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InventoryItem));
    callback(items);
  });

  return unsubscribe; // Return the unsubscribe function to stop listening
};

export const InventoryService = { getInventory, addItem, deleteItem, updateItem, subscribeToInventoryUpdates };
