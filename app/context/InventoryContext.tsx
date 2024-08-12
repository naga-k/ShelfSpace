'use client';

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { InventoryItem } from '../utils/types';
import { InventoryService } from '../services/InventoryService';
import useAuth from '../hooks/useAuth';
import { auth } from '../firebase';

type InventoryContextType = {
  inventory: InventoryItem[];
  addItem: (name: string, count: number) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (id: string, name: string, count: number) => Promise<void>;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, error } = useAuth(auth);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && user) {
      const fetchInventory = async () => {
        setFetching(true);
        try {
          console.log('Fetching inventory for user with UID:', user.uid);
          const items = await InventoryService.getInventory(user.uid);
          setInventory(items);
        } catch (error) {
          console.error('Error fetching inventory:', error);
        } finally {
          setFetching(false);
        }
      };

      fetchInventory();

      const unsubscribe = InventoryService.subscribeToInventoryUpdates(user.uid, setInventory);

      return () => unsubscribe();
    } else if (!loading && !user) {
      setInventory([]);
    }
  }, [user, loading]);

  const addItem = async (name: string, count: number) => {
    if (user) {
      try {
        const newItem = await InventoryService.addItem(user.uid, name, count);
        setInventory(prev => [...prev, newItem]);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const deleteItem = async (id: string) => {
    if (user) {
      try {
        await InventoryService.deleteItem(user.uid, id);
        setInventory(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  const updateItem = async (id: string, name: string, count: number) => {
    if (user) {
      try {
        await InventoryService.updateItem(user.uid, id, name, count);
        setInventory(prev => prev.map(item => item.id === id ? { ...item, name, count } : item));
      } catch (error) {
        console.error('Error updating item:', error);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem, deleteItem, updateItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
