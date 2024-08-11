// app/services/InventoryService.tsx

import { firestore } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { InventoryItem } from '../utils/types';

const getInventory = async (): Promise<InventoryItem[]> => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryCollection = collection(firestore, 'inventory');
  const snapshot = await getDocs(inventoryCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InventoryItem));
};

const addItem = async (name: string, count: number): Promise<InventoryItem> => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryCollection = collection(firestore, 'inventory');
  const docRef = await addDoc(inventoryCollection, { name, count });
  return { id: docRef.id, name, count };
};

const deleteItem = async (id: string) => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryDoc = doc(firestore, 'inventory', id);
  await deleteDoc(inventoryDoc);
};

const updateItem = async (id: string, name: string, count: number) => {
  if (!firestore) {
    throw new Error('Firestore is not initialized');
  }

  const inventoryDoc = doc(firestore, 'inventory', id);
  await updateDoc(inventoryDoc, { name, count });
};

export const InventoryService = { getInventory, addItem, deleteItem, updateItem };
