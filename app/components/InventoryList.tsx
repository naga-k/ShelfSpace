// app/components/InventoryList.tsx
'use client';

import React from 'react';
import useInventory from '../hooks/useInventory';

const InventoryList: React.FC = () => {
  const { inventory, deleteItem, updateItem } = useInventory();

  return (
    <ul>
      {inventory.map(item => (
        <li key={item.id}>
          {item.name} - {item.count}
          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <button onClick={() => updateItem(item.id, item.name, item.count)}>Update</button>
        </li>
      ))}
    </ul>
  );
};

export default InventoryList;
