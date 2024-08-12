"use client";

import React from 'react';
import { Box, Button, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Input } from '@chakra-ui/react';

interface InventoryItemProps {
  item: { id: string; name: string; count: number };
  isEditing: boolean;
  editName: string;
  editCount: string;
  setEditName: (name: string) => void;
  setEditCount: (count: string) => void;
  handleUpdate: () => void;
  handleCancel: () => void;
  startEditing: () => void;
  deleteItem: () => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  item,
  isEditing,
  editName,
  editCount,
  setEditName,
  setEditCount,
  handleUpdate,
  handleCancel,
  startEditing,
  deleteItem
}) => {
  const handleUpdateWithDeletion = () => {
    const count = parseInt(editCount, 10);
    if (count === 0) {
      deleteItem();
    } else {
      handleUpdate();
    }
  };

  return (
    <Box
      overflowX="auto" // Allow horizontal scrolling
      p={2}
      borderWidth={1}
      borderRadius="md"
      width="100%"
      mb={2} // Margin bottom for spacing
    >
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        wrap="nowrap" // Prevent wrapping to keep items in a single row
      >
        <Box flex="1" textAlign="left" p={2} borderWidth={1} borderRadius="md" minWidth="120px">
          {isEditing ? (
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              mb={2}
              placeholder="Item name"
            />
          ) : (
            item.name
          )}
        </Box>
        <Box flex="1" textAlign="left" p={2} borderWidth={1} borderRadius="md" minWidth="80px" ml={2}>
          {isEditing ? (
            <NumberInput
              value={editCount}
              onChange={(valueString) => setEditCount(valueString)}
              min={0}
              step={1}
              mb={2}
              _placeholder="Item count"
              allowMouseWheel
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          ) : (
            item.count
          )}
        </Box>
        <Flex ml={2} wrap="nowrap">
          {isEditing ? (
            <>
              <Button onClick={handleUpdateWithDeletion} colorScheme="teal" mr={2}>Save</Button>
              <Button onClick={handleCancel} variant="outline">Cancel</Button>
            </>
          ) : (
            <>
              <Button onClick={startEditing} mr={2}>Edit</Button>
              <Button onClick={deleteItem} colorScheme="red">Delete</Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default InventoryItem;
