import { useState, useEffect } from 'react';
import { InventoryService } from '../lib/InventoryService';
import { InventoryItem } from '../utils/types';

const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // Fetch initial inventory
    const fetchInventory = async () => {
      const items = await InventoryService.getInventory();
      setInventory(items);
    };

    fetchInventory(); // Initial fetch

    // Subscribe to real-time updates
    const unsubscribe = InventoryService.subscribeToInventoryUpdates((items) => {
      setInventory(items);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const addItem = async (name: string, count: number) => {
    const newItem = await InventoryService.addItem(name, count);
    // Optionally fetch the updated inventory or rely on real-time updates
  };

  const deleteItem = async (id: string) => {
    await InventoryService.deleteItem(id);
    // Optionally fetch the updated inventory or rely on real-time updates
  };

  const updateItem = async (id: string, name: string, count: number) => {
    await InventoryService.updateItem(id, name, count);
    // Optionally fetch the updated inventory or rely on real-time updates
  };

  return { inventory, addItem, deleteItem, updateItem };
};

export default useInventory;
