import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectInvoice,
  useInvoicesSelector,
} from '../../../../../../../../features/invoices/invoicesSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// interface
import { Column } from '../RepTableBody';
import { ReportMaster } from '../../../../../../../../api/invoice.services';
// utils
import { Order } from '../../../../../../../../utils/sorting';
// children components
import {
  StyledTableCellHeader,
  CustomSpan,
  TableBodyHeader,
} from '../../../../../common/Table/Body/content';

interface RepTableBodyHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ReportMaster
  ) => void;
  order: Order;
  orderBy: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function RepTableBodyHeader({
  order,
  orderBy,
  onRequestSort,
  columns,
  isCollapse,
}: RepTableBodyHeaderProps) {
  const dispatch = useAppDispatch();

  const { invoice } = useInvoicesSelector((state) => state.invoices);

  const {
    dispatch: { translate },
  } = useLanguage();

  const createSortHandler =
    (property: keyof ReportMaster) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const handleDeselect = () => {
    dispatch(selectInvoice(null));
  };

  return (
    <TableBodyHeader
      isCollapse={isCollapse}
      isItemSelected={invoice ? true : false}
      handleDeselect={handleDeselect}
    >
      {columns.map((column) => (
        <StyledTableCellHeader
          key={column.id}
          align={column.align}
          sortDirection={orderBy === column.id ? order : false}
        >
          {column.id === 'created' ||
          column.id === 'client_id' ||
          column.id === 'user_id' ? (
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              <Box fontWeight="fontWeightBold">
                {translate(column.label)}
                {orderBy === column.id ? (
                  <CustomSpan>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </CustomSpan>
                ) : null}
              </Box>
            </TableSortLabel>
          ) : (
            <Box fontWeight="fontWeightBold">{translate(column.label)}</Box>
          )}
        </StyledTableCellHeader>
      ))}
    </TableBodyHeader>
  );
}
