// app/context/InventoryContext.tsx
'use client';

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { InventoryItem } from '../utils/types';
import { InventoryService } from '../services/InventoryService';

type InventoryContextType = {
  inventory: InventoryItem[];
  addItem: (name: string, count: number) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (id: string, name: string, count: number) => Promise<void>;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const fetchInventory = async () => {
    const items = await InventoryService.getInventory();
    setInventory(items);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const addItem = async (name: string, count: number) => {
    const newItem = await InventoryService.addItem(name, count);
    setInventory(prev => [...prev, newItem]);
  };

  const deleteItem = async (id: string) => {
    await InventoryService.deleteItem(id);
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = async (id: string, name: string, count: number) => {
    await InventoryService.updateItem(id, name, count);
    setInventory(prev => prev.map(item => item.id === id ? { ...item, name, count } : item));
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
