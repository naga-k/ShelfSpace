"use client";

import React, { useState } from 'react';
import useInventory from '../hooks/useInventory';
import { Box, Button, Input } from '@chakra-ui/react';

const InventoryForm: React.FC = () => {
  const { addItem } = useInventory();
  const [name, setName] = useState('');
  const [count, setCount] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || count === undefined) {
      return;
    }
    await addItem(name, count);
    setName('');
    setCount(undefined);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bg="white" width="100%">
      <Box as="form" onSubmit={handleSubmit} width="100%">
        <Box display="flex" flexDirection="row" mb={4} width="100%">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            mr={2}
            flex="1"
          />
          <Input
            type="number"
            value={count === undefined ? '' : count}
            onChange={(e) => setCount(e.target.value ? parseInt(e.target.value, 10) : undefined)}
            placeholder="Item count"
            mr={2}
            flex="1"
          />
          <Button type="submit" colorScheme="teal">Add Item</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryForm;
