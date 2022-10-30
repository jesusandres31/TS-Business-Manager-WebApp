import React, { createContext, useContext, ReactNode } from 'react';

export type CollapsedContextType = {
  collapsed: number | string;
  setCollapsed: (Collapsed: number | string) => void;
};

export const CollapsedContext = createContext<CollapsedContextType>({
  collapsed: '',
  setCollapsed: (collapsed) => console.warn('no collapsed provider'),
});

export const useCollapsed = () => useContext(CollapsedContext);

interface CollapsedStateProps {
  children: ReactNode;
}

export const CollapsedProvider = ({ children }: CollapsedStateProps) => {
  const [collapsed, setCollapsed] = React.useState<number | string>('');

  return (
    <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
};
