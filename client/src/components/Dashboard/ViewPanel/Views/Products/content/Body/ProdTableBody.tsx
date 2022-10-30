import React, { useEffect } from 'react';
// global state
import { useProductsSelector } from '../../../../../../../features/products/productsSlice';
// interface
import { Product } from '../../../../../../../api/product.services';
// context
import { useView } from '../../../../../context/ViewContext';
// hooks
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
// utils
import { Order } from '../../../../../../../utils/sorting';
// components
import { TableBody } from '../../../../common/Table/Body';
// children components
import ProdTableBodyHeader from './content/ProdTableBodyHeader';
import ProdTableBodyContainer from './content/ProdTableBodyContainer';

export interface Column {
  id: 'id' | 'name' | 'stock' | 'sale_price' | 'product_type_id' | 'min_stock';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'name', minWidth: 100, align: 'left' },
  {
    id: 'sale_price',
    label: 'salePrice',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'product_type_id',
    label: 'UM',
    minWidth: 100,
    align: 'right',
  },
  { id: 'stock', label: 'stock', minWidth: 100, align: 'right' },
  /* {
    id: 'min_stock',
    label: 'minStock',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  }, */
];

export default function ProdTableBody() {
  const { loading } = useProductsSelector((state) => state.products);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Product>('name');
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
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableBody loading={loading}>
      <ProdTableBodyHeader
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        columns={columns}
        isCollapse={isCollapse}
      />
      <ProdTableBodyContainer
        order={order}
        orderBy={orderBy}
        columns={columns}
        isCollapse={isCollapse}
      />
    </TableBody>
  );
}
