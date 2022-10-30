import React, { createContext, useContext, ReactNode } from 'react';

export type PageContextType = {
  page: number;
  setPage: (Page: number) => void;
};

export const PageContext = createContext<PageContextType>({
  page: 0,
  setPage: (page) => console.warn('no page provider'),
});

export const usePage = () => useContext(PageContext);

interface PageStateProps {
  children: ReactNode;
}

export const PageProvider = ({ children }: PageStateProps) => {
  const [page, setPage] = React.useState(0);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
