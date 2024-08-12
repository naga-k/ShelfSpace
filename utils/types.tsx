// app/utils/types.tsx

// Type definition for an inventory item
export interface InventoryItem {
    id: string;
    name: string;
    count: number;
  }
  
  // Type definition for the context used in InventoryContext
  export interface InventoryContextType {
    inventory: InventoryItem[];
    addItem: (name: string, count: number) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    updateItem: (id: string, name: string, count: number) => Promise<void>;
  }
  