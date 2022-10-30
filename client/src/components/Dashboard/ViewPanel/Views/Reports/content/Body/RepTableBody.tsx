import React, { useEffect } from 'react';
// global state
import { useInvoicesSelector } from '../../../../../../../features/invoices/invoicesSlice';
// interface
import { ReportMaster } from '../../../../../../../api/invoice.services';
import { IDate } from '../../../../../../../interfaces';
// context
import { useView } from '../../../../../context/ViewContext';
// hooks
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
// utils
import { Order } from '../../../../../../../utils/sorting';
// components
import { TableBody } from '../../../../common/Table/Body';
// children components
import RepTableBodyHeader from './content/RepTableBodyHeader';
import RepTableBodyContainer from './content/RepTableBodyContainer';

export interface Column {
  id:
    | 'id'
    | 'user_id'
    | 'client_id'
    | 'sale_type_id'
    | 'payment_type_id'
    | 'created'
    | 'fee_percentage'
    | 'total';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'id', minWidth: 100, align: 'left' },
  { id: 'created', label: 'created', minWidth: 100, align: 'right' },
  { id: 'client_id', label: 'client', minWidth: 100, align: 'right' },
  { id: 'sale_type_id', label: 'sale_type_id', minWidth: 100, align: 'right' },
  {
    id: 'payment_type_id',
    label: 'payment_type_id',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'fee_percentage',
    label: 'fee_percentage',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },

  {
    id: 'total',
    label: 'total',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  /* { id: 'user_id', label: 'user', minWidth: 100, align: 'right' }, */
];

interface RepTableBodyProps {
  specificDate: Date | null;
  rangedDate: IDate;
}

export default function RepTableBody({
  specificDate,
  rangedDate,
}: RepTableBodyProps) {
  const { loading } = useInvoicesSelector((state) => state.invoices);

  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof ReportMaster>('created');
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
    property: keyof ReportMaster
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableBody loading={loading}>
      <RepTableBodyHeader
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        columns={columns}
        isCollapse={isCollapse}
      />
      <RepTableBodyContainer
        order={order}
        orderBy={orderBy}
        columns={columns}
        isCollapse={isCollapse}
        specificDate={specificDate}
        rangedDate={rangedDate}
      />
    </TableBody>
  );
}
