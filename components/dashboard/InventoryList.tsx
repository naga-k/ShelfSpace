// app/dashboard/InventoryList.tsx

"use client";

import React, { useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import useInventory from '../../hooks/useInventory';
import InventoryItem from './InventoryItem'; // Import the InventoryItem component

const InventoryList: React.FC = () => {
  const { inventory, deleteItem, updateItem } = useInventory();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCount, setEditCount] = useState('');

  const startEditing = (item: { id: string; name: string; count: number }) => {
    setEditingItemId(item.id);
    setEditName(item.name);
    setEditCount(item.count.toString());
  };

  const handleUpdate = () => {
    if (editingItemId && editName && editCount) {
      updateItem(editingItemId, editName, parseInt(editCount));
      setEditingItemId(null); // Exit editing mode
      setEditName('');
      setEditCount('');
    }
  };

  const handleCancel = () => {
    setEditingItemId(null); // Exit editing mode
    setEditName('');
    setEditCount('');
  };

  return (
    <VStack spacing={4} width="100%" align="stretch">
      {inventory.map(item => (
        <Box key={item.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md" width="100%" bg="white">
          <InventoryItem 
            item={item}
            isEditing={editingItemId === item.id}
            editName={editName}
            editCount={editCount}
            setEditName={setEditName}
            setEditCount={setEditCount}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
            startEditing={() => startEditing(item)}
            deleteItem={() => deleteItem(item.id)}
          />
        </Box>
      ))}
    </VStack>
  );
};

export default InventoryList;
