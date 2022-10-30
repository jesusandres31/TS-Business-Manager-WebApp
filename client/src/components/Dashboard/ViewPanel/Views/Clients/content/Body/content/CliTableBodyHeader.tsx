import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectClient,
  useClientsSelector,
} from '../../../../../../../../features/clients/clientsSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// interface
import { Column } from '../CliTableBody';
import { Client } from '../../../../../../../../api/client.services';
// utils
import { Order } from '../../../../../../../../utils/sorting';
// children components
import {
  StyledTableCellHeader,
  CustomSpan,
  TableBodyHeader,
} from '../../../../../common/Table/Body/content';

interface CliTableBodyHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Client
  ) => void;
  order: Order;
  orderBy: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function CliTableBodyHeader({
  order,
  orderBy,
  onRequestSort,
  columns,
  isCollapse,
}: CliTableBodyHeaderProps) {
  const dispatch = useAppDispatch();

  const { client } = useClientsSelector((state) => state.clients);

  const {
    dispatch: { translate },
  } = useLanguage();

  const createSortHandler =
    (property: keyof Client) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const handleDeselect = () => {
    dispatch(selectClient(null));
  };

  return (
    <TableBodyHeader
      isCollapse={isCollapse}
      isItemSelected={client ? true : false}
      handleDeselect={handleDeselect}
    >
      {columns.map((column) => (
        <StyledTableCellHeader
          key={column.id}
          align={column.align}
          sortDirection={orderBy === column.id ? order : false}
        >
          {column.id === 'company_name' || column.id === 'locality' ? (
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
