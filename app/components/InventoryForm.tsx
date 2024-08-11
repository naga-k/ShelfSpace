import React, { useState } from 'react';
import useInventory from '../hooks/useInventory'; // Ensure correct import

const InventoryForm: React.FC = () => {
  const { addItem } = useInventory(); // Use the hook here
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(name, count);
    setName('');
    setCount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Item Name" 
        required 
      />
      <input 
        type="number" 
        value={count} 
        onChange={(e) => setCount(Number(e.target.value))} 
        placeholder="Item Count" 
        required 
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
