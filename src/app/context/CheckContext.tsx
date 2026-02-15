import { createContext, useContext, useState, ReactNode } from 'react';

interface CheckContextType {
  hasDailyCheck: boolean;
  setHasDailyCheck: (value: boolean) => void;
}

const CheckContext = createContext<CheckContextType | undefined>(undefined);

export function CheckProvider({ children }: { children: ReactNode }) {
  const [hasDailyCheck, setHasDailyCheck] = useState(false);

  return (
    <CheckContext.Provider value={{ hasDailyCheck, setHasDailyCheck }}>
      {children}
    </CheckContext.Provider>
  );
}

export function useCheck() {
  const context = useContext(CheckContext);
  if (context === undefined) {
    throw new Error('useCheck must be used within a CheckProvider');
  }
  return context;
}