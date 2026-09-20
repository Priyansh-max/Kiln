import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'kiln:demo-mode';
const DemoModeContext = createContext(null);

const readStoredMode = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export function DemoModeProvider({ children }) {
  const [isDemoMode, setIsDemoModeState] = useState(readStoredMode);

  const setIsDemoMode = (enabled) => {
    setIsDemoModeState(enabled);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // Demo mode still works for this session when storage is unavailable.
    }
  };

  const value = useMemo(() => ({
    isDemoMode,
    setIsDemoMode,
    toggleDemoMode: () => setIsDemoMode(!isDemoMode),
  }), [isDemoMode]);

  return (
    <DemoModeContext.Provider value={value}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used inside DemoModeProvider');
  }
  return context;
}
