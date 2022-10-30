import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectProduct,
  useProductsSelector,
} from '../../../../../../../../features/products/productsSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// interface
import { Column } from '../ProdTableBody';
import { Product } from '../../../../../../../../api/product.services';
// utils
import { Order } from '../../../../../../../../utils/sorting';
// children components
import {
  StyledTableCellHeader,
  CustomSpan,
  TableBodyHeader,
} from '../../../../../common/Table/Body/content';

interface ProdTableBodyHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => void;
  order: Order;
  orderBy: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function ProdTableBodyHeader({
  order,
  orderBy,
  onRequestSort,
  columns,
  isCollapse,
}: ProdTableBodyHeaderProps) {
  const dispatch = useAppDispatch();

  const { product } = useProductsSelector((state) => state.products);

  const {
    dispatch: { translate },
  } = useLanguage();

  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const handleDeselect = () => {
    dispatch(selectProduct(null));
  };

  return (
    <TableBodyHeader
      isCollapse={isCollapse}
      isItemSelected={product ? true : false}
      handleDeselect={handleDeselect}
    >
      {columns.map((column) => (
        <StyledTableCellHeader
          key={column.id}
          align={column.align}
          sortDirection={orderBy === column.id ? order : false}
        >
          {column.id === 'name' || column.id === 'product_type_id' ? (
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
