import React, { useState } from 'react';
import useInventory from '../hooks/useInventory';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />
      <input
        type="number"
        value={count === undefined ? '' : count} // Display empty string if count is undefined
        onChange={(e) => setCount(e.target.value ? parseInt(e.target.value, 10) : undefined)} // Parse to number or set undefined
        placeholder="Item count"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
