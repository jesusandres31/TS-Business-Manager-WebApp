import React, { useEffect } from 'react';
// global state
import { useClientsSelector } from '../../../../../../../features/clients/clientsSlice';
// interface
import { Client } from '../../../../../../../api/client.services';
// context
import { useView } from '../../../../../context/ViewContext';
// hooks
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
// utils
import { Order } from '../../../../../../../utils/sorting';
// components
import { TableBody } from '../../../../common/Table/Body';
// children components
import CliTableBodyHeader from './content/CliTableBodyHeader';
import CliTableBodyContainer from './content/CliTableBodyContainer';

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

interface CliTableBodyProps {
  showCliWithDebts: boolean;
}

export default function CliTableBody({ showCliWithDebts }: CliTableBodyProps) {
  const { loading } = useClientsSelector((state) => state.clients);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Client>('company_name');
  const [isCollapse, setIsCollapse] = React.useState<boolean>(true);

  const { view } = useView();

  const { isRecycleBin } = useIsRecycleBin();

  useEffect(() => {
    if (isRecycleBin) {
      setIsCollapse(false);
    } else {
      setIsCollapse(true);
    }
  }, [view]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Client
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableBody loading={loading}>
      <CliTableBodyHeader
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        columns={columns}
        isCollapse={isCollapse}
      />
      <CliTableBodyContainer
        order={order}
        orderBy={orderBy}
        columns={columns}
        isCollapse={isCollapse}
        showCliWithDebts={showCliWithDebts}
      />
    </TableBody>
  );
}
