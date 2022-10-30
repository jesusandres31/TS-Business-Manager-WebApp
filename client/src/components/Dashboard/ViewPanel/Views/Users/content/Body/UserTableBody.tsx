import React, { useEffect } from 'react';
// global state
import { useUsersSelector } from '../../../../../../../features/users/usersSlice';
// interface
import { User } from '../../../../../../../api/user.services';
// context
import { useView } from '../../../../../context/ViewContext';
// hooks
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
// utils
import { Order } from '../../../../../../../utils/sorting';
// components
import { TableBody } from '../../../../common/Table/Body';
// children components
import UserTableBodyHeader from './content/UserTableBodyHeader';
import UserTableBodyContainer from './content/UserTableBodyContainer';

export interface Column {
  id:
    | 'id'
    | 'role_id'
    | 'locality'
    | 'name'
    | 'surname'
    | 'email'
    | 'phone'
    | 'username';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'name', minWidth: 100, align: 'left' },
  { id: 'surname', label: 'surname', minWidth: 100, align: 'left' },
  { id: 'phone', label: 'phone', minWidth: 100, align: 'right' },
  { id: 'email', label: 'email', minWidth: 100, align: 'right' },
  { id: 'locality', label: 'locality', minWidth: 100, align: 'right' },
  { id: 'role_id', label: 'role', minWidth: 100, align: 'right' },
  { id: 'username', label: 'username', minWidth: 100, align: 'right' },
];

export default function ProdTableBody() {
  const { loading } = useUsersSelector((state) => state.users);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof User>('name');
  const [isCollapse, setIsCollapse] = React.useState<boolean>(false);

  const { view } = useView();

  const { isRecycleBin } = useIsRecycleBin();

  useEffect(() => {
    if (isRecycleBin) {
      setIsCollapse(false);
    } else {
      setIsCollapse(false);
    }
  }, [view]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableBody loading={loading}>
      <UserTableBodyHeader
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        columns={columns}
        isCollapse={isCollapse}
      />
      <UserTableBodyContainer
        order={order}
        orderBy={orderBy}
        columns={columns}
        isCollapse={isCollapse}
      />
    </TableBody>
  );
}
