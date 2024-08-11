import { useState, useEffect } from 'react';
import { InventoryService } from '../services/InventoryService';
import { InventoryItem } from '../utils/types';

const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const items = await InventoryService.getInventory();
      setInventory(items);
    };

    fetchInventory();
  }, []);

  const addItem = async (name: string, count: number) => {
    const newItem = await InventoryService.addItem(name, count);
    setInventory((prev) => [...prev, newItem]);
  };

  const deleteItem = async (id: string) => {
    await InventoryService.deleteItem(id);
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = async (id: string, name: string, count: number) => {
    await InventoryService.updateItem(id, name, count);
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name, count } : item))
    );
  };

  return { inventory, addItem, deleteItem, updateItem };
};

export default useInventory; // Ensure this is default export
