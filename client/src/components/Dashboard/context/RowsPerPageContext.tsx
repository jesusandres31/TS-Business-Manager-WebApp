import React, { createContext, useContext, useEffect, ReactNode } from "react";

const DEFAULT_ROWS_PER_PAGE = 30;

export type RowsPerPageContextType = {
  rowsPerPage: number;
  setRowsPerPage: (RowsPerPage: number) => void;
};

export const RowsPerPageContext = createContext<RowsPerPageContextType>({
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  setRowsPerPage: (rowsPerPage) => console.warn("no rowsPerPage provider"),
});

export const useRowsPerPage = () => useContext(RowsPerPageContext);

interface RowsPerPageStateProps {
  children: ReactNode;
}

export const RowsPerPageProvider = ({ children }: RowsPerPageStateProps) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    if (!localStorage.getItem("rowsPerPage")) {
      localStorage.setItem("rowsPerPage", rowsPerPage.toString());
    } else {
      let rows: number = 0;
      const rowsPerPage = localStorage.getItem("rowsPerPage");
      if (typeof rowsPerPage === "string") {
        rows = JSON.parse(rowsPerPage);
      }
      setRowsPerPage(rows);
    }
  }, []);

  return (
    <RowsPerPageContext.Provider value={{ rowsPerPage, setRowsPerPage }}>
      {children}
    </RowsPerPageContext.Provider>
  );
};
