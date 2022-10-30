import React, { createContext, useContext, ReactNode } from 'react';

export enum View {
  Home = 'HOME',
  Reports = 'REPORTS',
  Products = 'PRODUCTS',
  Clients = 'CLIENTS',
  Providers = 'PROVIDERS',
  StatProducts = 'STAT_PRODUCTS',
  StatClients = 'STAT_CLIENTS',
  StatProviders = 'STAT_PROVIDERS',
  StatProfits = 'STAT_PROFITS',
  Preferences = 'PREFERENCES',
  Users = 'USERS',
  BinProducts = 'BIN_PRODUCTS',
  BinClinets = 'BIN_CLIENTS',
  BinProviders = 'BIN_PROVIDERS',
  BinUsers = 'BIN_USERS',
}

export type ViewContextType = {
  view: View;
  setView: (View: View) => void;
};

export const ViewContext = createContext<ViewContextType>({
  view: View.Home,
  setView: (view) => console.warn('no view provider'),
});

export const useView = () => useContext(ViewContext);

interface ViewStateProps {
  children: ReactNode;
}

export const ViewProvider = ({ children }: ViewStateProps) => {
  const [view, setView] = React.useState(View.Home);

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
