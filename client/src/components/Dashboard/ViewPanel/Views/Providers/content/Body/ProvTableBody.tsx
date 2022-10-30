import React, { useEffect } from 'react';
// global state
import { useProvidersSelector } from '../../../../../../../features/providers/providersSlice';
// interface
import { Provider } from '../../../../../../../api/provider.services';
// context
import { useView } from '../../../../../context/ViewContext';
// hooks
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
// utils
import { Order } from '../../../../../../../utils/sorting';
// components
import { TableBody } from '../../../../common/Table/Body';
// children components
import ProvTableBodyHeader from './content/ProvTableBodyHeader';
import ProvTableBodyContainer from './content/ProvTableBodyContainer';

export interface Column {
  id:
    | 'id'
    | 'company_name'
    | 'email'
    | 'phone'
    | 'locality'
    | 'address'
    | 'tax_id';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'company_name', label: 'company_name', minWidth: 100, align: 'left' },
  { id: 'phone', label: 'phone', minWidth: 100, align: 'right' },
  { id: 'email', label: 'email', minWidth: 100, align: 'right' },
  { id: 'tax_id', label: 'tax_id', minWidth: 100, align: 'right' },
  { id: 'locality', label: 'locality', minWidth: 100, align: 'right' },
  { id: 'address', label: 'address', minWidth: 100, align: 'right' },
];

export default function ProvTableBody() {
  const { loading } = useProvidersSelector((state) => state.providers);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Provider>('company_name');
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
    property: keyof Provider
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableBody loading={loading}>
      <ProvTableBodyHeader
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        columns={columns}
        isCollapse={isCollapse}
      />
      <ProvTableBodyContainer
        order={order}
        orderBy={orderBy}
        columns={columns}
        isCollapse={isCollapse}
      />
    </TableBody>
  );
}
