import { useState, useEffect } from 'react';
import { InventoryService } from '../services/InventoryService';
import { InventoryItem } from '../utils/types';
import useAuth from '../hooks/useAuth';
import { auth } from '../firebase';

const useInventory = () => {
  const { user, loading } = useAuth(auth);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && user) {
      const fetchInventory = async () => {
        setFetching(true);
        try {
          const items = await InventoryService.getInventory(user.uid);
          setInventory(items);
        } catch (error) {
          console.error('Error fetching inventory:', error);
        } finally {
          setFetching(false);
        }
      };

      fetchInventory();

      const unsubscribe = InventoryService.subscribeToInventoryUpdates(user.uid, (items: InventoryItem[]) => {
        setInventory(items);
      });

      return () => unsubscribe();
    } else if (!loading && !user) {
      setInventory([]);
    }
  }, [user, loading]);

  const addItem = async (name: string, count: number) => {
    if (user) {
      try {
        const newItem = await InventoryService.addItem(user.uid, name, count);
        setInventory((prev) => [...prev, newItem]);
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
        setInventory((prev) => prev.filter((item) => item.id !== id));
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
        setInventory((prev) =>
          prev.map((item) => (item.id === id ? { ...item, name, count } : item))
        );
      } catch (error) {
        console.error('Error updating item:', error);
      }
    } else {
      console.error('User is not authenticated.');
    }
  };

  return { inventory, addItem, deleteItem, updateItem };
};

export default useInventory;
