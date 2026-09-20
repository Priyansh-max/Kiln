import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kiln:demo-mode';
export const DEMO_USER_ID = '8a1fcea2-6eb0-4655-a9da-95d74dc44dd8';
const DemoModeContext = createContext(null);

const readStoredMode = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export function DemoModeProvider({ children, user }) {
  const canUseDemoMode = user?.id === DEMO_USER_ID;
  const [isDemoModeState, setIsDemoModeState] = useState(readStoredMode);

  useEffect(() => {
    if (!canUseDemoMode) {
      setIsDemoModeState(false);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // The in-memory state is still reset when storage is unavailable.
      }
    }
  }, [canUseDemoMode]);

  const setIsDemoMode = (enabled) => {
    const nextMode = canUseDemoMode && enabled;
    setIsDemoModeState(nextMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(nextMode));
    } catch {
      // Demo mode still works for this session when storage is unavailable.
    }
  };

  const value = useMemo(() => ({
    isDemoMode: canUseDemoMode && isDemoModeState,
    canUseDemoMode,
    setIsDemoMode,
    toggleDemoMode: () => setIsDemoMode(!(canUseDemoMode && isDemoModeState)),
  }), [canUseDemoMode, isDemoModeState]);

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
