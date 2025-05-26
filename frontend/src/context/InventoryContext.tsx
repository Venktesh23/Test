// Global state management using React Context
// This provides a way to trigger data refreshes across different components
// when equipment or locations are modified

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context data
interface InventoryContextType {
  refreshTrigger: number;    // Counter that increments to trigger re-fetches
  triggerRefresh: () => void; // Function to increment the counter
}

// Create the context with undefined as default (will be provided by InventoryProvider)
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Custom hook to use the inventory context
// This provides a clean way for components to access the context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  
  // Throw error if hook is used outside of provider
  // This helps catch bugs during development
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

// Props interface for the provider component
interface InventoryProviderProps {
  children: ReactNode; // Any React components that will be wrapped
}

// Provider component that wraps the app and provides global state
// This allows any child component to trigger refreshes across the entire app
export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  // State to track when data should be refreshed
  // Components watch this value and re-fetch data when it changes
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger a refresh across all components
  // Increments the counter, causing useEffect hooks to re-run
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <InventoryContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </InventoryContext.Provider>
  );
}; 