import React, { createContext, useContext, useEffect, ReactNode } from 'react';

export type DarkModeContextType = {
  darkMode: boolean;
  setDarkMode: (DarkMode: boolean) => void;
};

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  setDarkMode: (darkMode) => console.warn('no darkMode provider'),
});

export const useDarkMode = () => useContext(DarkModeContext);

interface ModeStateProps {
  children: ReactNode;
}

const DarkModeProvider = ({ children }: ModeStateProps) => {
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    if (!localStorage.getItem('isDarkMode')) {
      localStorage.setItem('isDarkMode', darkMode.toString());
    } else {
      const isDarkMode = localStorage.getItem('isDarkMode');
      const isTrueSet = isDarkMode === 'true';
      setDarkMode(isTrueSet);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
