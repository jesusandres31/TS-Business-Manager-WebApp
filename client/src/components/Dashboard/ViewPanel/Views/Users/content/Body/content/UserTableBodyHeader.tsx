import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectUser,
  useUsersSelector,
} from '../../../../../../../../features/users/usersSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// interface
import { Column } from '../UserTableBody';
import { User } from '../../../../../../../../api/user.services';
// utils
import { Order } from '../../../../../../../../utils/sorting';
// children components
import {
  StyledTableCellHeader,
  CustomSpan,
  TableBodyHeader,
} from '../../../../../common/Table/Body/content';

interface UserTableBodyHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => void;
  order: Order;
  orderBy: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function UserTableBodyHeader({
  order,
  orderBy,
  onRequestSort,
  columns,
  isCollapse,
}: UserTableBodyHeaderProps) {
  const dispatch = useAppDispatch();

  const { user } = useUsersSelector((state) => state.users);

  const {
    dispatch: { translate },
  } = useLanguage();

  const createSortHandler =
    (property: keyof User) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const handleDeselect = () => {
    dispatch(selectUser(null));
  };

  return (
    <TableBodyHeader
      isCollapse={isCollapse}
      isItemSelected={user ? true : false}
      handleDeselect={handleDeselect}
    >
      {columns.map((column) => (
        <StyledTableCellHeader
          key={column.id}
          align={column.align}
          sortDirection={orderBy === column.id ? order : false}
        >
          {column.id === 'name' ||
          column.id === 'surname' ||
          column.id === 'locality' ? (
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
