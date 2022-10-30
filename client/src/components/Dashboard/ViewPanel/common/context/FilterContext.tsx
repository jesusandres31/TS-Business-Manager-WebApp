import React, { createContext, useContext, ReactNode } from 'react';

export type FilterContextType = {
  filter: string;
  setFilter: (Filter: string) => void;
};

export const FilterContext = createContext<FilterContextType>({
  filter: '',
  setFilter: (filter) => console.warn('no filter provider'),
});

export const useFilter = () => useContext(FilterContext);

interface FilterStateProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterStateProps) => {
  const [filter, setFilter] = React.useState<string>('');

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
