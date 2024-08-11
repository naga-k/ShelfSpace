// app/page.tsx
'use client';

import React from 'react';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

const Page: React.FC = () => {
  return (
    <div className="container">
      <h1>Inventory Management</h1>
      <InventoryForm />
      <InventoryList />
    </div>
  );
};

export default Page;
