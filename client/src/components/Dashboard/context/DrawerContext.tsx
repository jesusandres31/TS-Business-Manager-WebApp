import React, { createContext, useContext, ReactNode } from 'react';

export type OpenDrawerContextType = {
  openDrawer: boolean;
  setOpenDrawer: (OpenDrawer: boolean) => void;
};

export const OpenDrawerContext = createContext<OpenDrawerContextType>({
  openDrawer: false,
  setOpenDrawer: (openDrawer) => console.warn('no openDrawer provider'),
});

export const useOpenDrawer = () => useContext(OpenDrawerContext);

interface DrawerStateProps {
  children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerStateProps) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <OpenDrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
      {children}
    </OpenDrawerContext.Provider>
  );
};
