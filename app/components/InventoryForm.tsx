'use client'

import React, { useState } from 'react';
import useInventory from '../hooks/useInventory';
import { Box, Button, Input } from '@chakra-ui/react';

const InventoryForm: React.FC = () => {
  const { addItem } = useInventory();
  const [name, setName] = useState('');
  const [count, setCount] = useState<number | undefined>(undefined); // Initialize as undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || count === undefined) {
      // Handle validation error if name or count is missing
      return;
    }
    await addItem(name, count);
    setName(''); // Reset the name
    setCount(undefined); // Reset the count
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />
      <Input
        type="number"
        value={count === undefined ? '' : count} // Display empty string if count is undefined
        onChange={(e) => setCount(e.target.value ? parseInt(e.target.value, 10) : undefined)} // Parse to number or set undefined
        placeholder="Item count"
      />
      <Button type="submit">Add Item</Button>
    </Box>
  );
};

export default InventoryForm;
