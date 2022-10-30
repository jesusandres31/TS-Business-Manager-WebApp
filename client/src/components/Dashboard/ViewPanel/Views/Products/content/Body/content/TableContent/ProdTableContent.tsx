import React from 'react';
// global context
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  selectProduct,
  useProductsSelector,
} from '../../../../../../../../../features/products/productsSlice';
// context
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// hooks
import { useExtraTypes } from '../../../../../../../../../hooks/useExtraTypes';
import { useIsRecycleBin } from '../../../../../../common/hooks/useIsRecycleBin';
// utils
import { removeDecZeros } from '../../../../../../../../../utils/removeDecZeros';
// interface
import { Column } from '../../ProdTableBody';
import { Product } from '../../../../../../../../../api/product.services';
// context
import { useCollapsed } from '../../../../../../common/context/CollapsedContext';
// components
import {
  StyledTableCell,
  TableContent,
} from '../../../../../../common/Table/Body/content/TableContent';
import ProdCollapseContent from './Collapse/ProdCollapseContent';

interface ProdTableContentProps {
  row: Product;
  labelId: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function ProdTableContent({
  row,
  labelId,
  columns,
  isCollapse,
}: ProdTableContentProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { product } = useProductsSelector((state) => state.products);

  const { collapsed, setCollapsed } = useCollapsed();

  const { indexProductTypeName } = useExtraTypes();

  const { isRecycleBin } = useIsRecycleBin();

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    let newSelected: Product | null = null;
    if (product === row) {
      // close collapse
      setCollapsed('');
    } else {
      newSelected = row;
      // close collapse
      if (collapsed !== row.id) {
        setCollapsed('');
      }
    }
    dispatch(selectProduct(newSelected));
  };

  const fixCollapse = () => {
    setCollapsed(row.id);
    // deselect item if needed
    if (product) {
      if (product.id !== row.id) {
        dispatch(selectProduct(null));
      }
    }
  };

  return (
    <>
      <TableContent
        row={row}
        labelId={labelId}
        isCollapse={isCollapse}
        selectedItem={product}
        handleClick={handleClick}
        fixCollapse={fixCollapse}
      >
        {columns.map((column) => {
          let value = row[column.id];

          // getting name of product_type_id
          if (column.id === 'product_type_id' && typeof value === 'number') {
            value = translate(indexProductTypeName(value));
          }

          // removing zeros decimals from stock
          if (column.id === 'stock') {
            value = removeDecZeros(value);
          }

          // adding $ to money values
          if (column.id === 'sale_price' && typeof value === 'string') {
            value = `$ ${value}`;
          }

          return (
            <StyledTableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.format && typeof value === 'number'
                ? column.format(value)
                : value}
            </StyledTableCell>
          );
        })}
      </TableContent>

      {isRecycleBin ? null : <ProdCollapseContent row={row} />}
    </>
  );
}
