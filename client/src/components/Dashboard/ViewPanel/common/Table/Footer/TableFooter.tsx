import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
// context
import { useLanguage } from "../../../../../../context/LanguageContext";
import { usePage } from "../../context/PageContext";
import { useRowsPerPage } from "../../../../context/RowsPerPageContext";
// utils
import { setRowsPerPageInLS } from "../../../../../../utils/browser";

interface TableFooterProps {
  rows: any[];
}

export default function TableFooter({ rows }: TableFooterProps) {
  const { page, setPage } = usePage();
  const { rowsPerPage, setRowsPerPage } = useRowsPerPage();

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setRowsPerPageInLS(event.target.value.toString());
  };

  return (
    <TablePagination
      rowsPerPageOptions={[30, 40, 50]}
      colSpan={3}
      component="div"
      labelRowsPerPage={translate("rowsPerPage")}
      labelDisplayedRows={(from) =>
        `${from.from}-${from.to === -1 ? from.count : from.to} ${translate(
          "of"
        )} ${from.count}`
      }
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { "aria-label": "rows per page" },
        // native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
