// app/components/InventoryList.tsx
import React from 'react';
import { Box, Button, List, ListItem } from '@chakra-ui/react';
import useInventory from '../hooks/useInventory';

const InventoryList: React.FC = () => {
  const { inventory, deleteItem, updateItem } = useInventory();

  return (
    <List>
      {inventory.map(item => (
        <ListItem key={item.id}>
          <Box>
            {item.name} - {item.count}
          </Box>
          <Button onClick={() => deleteItem(item.id)}>Delete</Button>
          <Button onClick={() => updateItem(item.id, item.name, item.count)}>Update</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default InventoryList;
