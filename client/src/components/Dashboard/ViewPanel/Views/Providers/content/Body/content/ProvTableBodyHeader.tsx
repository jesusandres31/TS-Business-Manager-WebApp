import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectProvider,
  useProvidersSelector,
} from '../../../../../../../../features/providers/providersSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// interface
import { Column } from '../ProvTableBody';
import { Provider } from '../../../../../../../../api/provider.services';
// utils
import { Order } from '../../../../../../../../utils/sorting';
// children components
import {
  StyledTableCellHeader,
  CustomSpan,
  TableBodyHeader,
} from '../../../../../common/Table/Body/content';

interface ProvTableBodyHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Provider
  ) => void;
  order: Order;
  orderBy: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function ProvTableBodyHeader({
  order,
  orderBy,
  onRequestSort,
  columns,
  isCollapse,
}: ProvTableBodyHeaderProps) {
  const dispatch = useAppDispatch();

  const { provider } = useProvidersSelector((state) => state.providers);

  const {
    dispatch: { translate },
  } = useLanguage();

  const createSortHandler =
    (property: keyof Provider) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const handleDeselect = () => {
    dispatch(selectProvider(null));
  };

  return (
    <TableBodyHeader
      isCollapse={isCollapse}
      isItemSelected={provider ? true : false}
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
