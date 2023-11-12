
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface SelectedAttractionContextProps {
  children: ReactNode;
}

interface SelectedAttractionContextValue {
  selectedAttraction: number | null;
  setSelectedAttraction: Dispatch<SetStateAction<number | null>>; 
}

export const SelectedAttractionContext = createContext<SelectedAttractionContextValue | undefined>(undefined);

export const SelectedAttractionContextProvider: React.FC<SelectedAttractionContextProps> = ({ children }) => {
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);

  const contextValue: SelectedAttractionContextValue = {
    selectedAttraction,
    setSelectedAttraction,
  };

  return (
    <SelectedAttractionContext.Provider value={contextValue}>
      {children}
    </SelectedAttractionContext.Provider>
  );
};

export const useSelectedAttractionContext = () => {
  const context = useContext(SelectedAttractionContext);

  if (!context) {
    throw new Error('useSelectedAttractionContext must be used within a SelectedAttractionContextProvider');
  }

  return context;
};
