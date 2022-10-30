import { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectProduct,
  useProductsSelector,
} from '../../../../../../../../features/products/productsSlice';
// context
import { useView } from '../../../../../../context/ViewContext';
import { useFilter } from '../../../../../common/context/FilterContext';
import { usePage } from '../../../../../common/context/PageContext';
import { useRowsPerPage } from '../../../../../../context/RowsPerPageContext';
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useExtraTypes } from '../../../../../../../../hooks/useExtraTypes';
import { useIsRecycleBin } from '../../../../../common/hooks/useIsRecycleBin';
// interface
import { Product } from '../../../../../../../../api/product.services';
import { Column } from '../ProdTableBody';
// utils
import {
  Order,
  stableSort,
  getComparator,
} from '../../../../../../../../utils/sorting';
// children components
import ProdTableContent from './TableContent/ProdTableContent';

interface ProdTableBodyContainerProps {
  order: Order;
  orderBy: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function ProdTableBodyContainer({
  order,
  orderBy,
  columns,
  isCollapse,
}: ProdTableBodyContainerProps) {
  const dispatch = useAppDispatch();

  const { view } = useView();

  const { filter, setFilter } = useFilter();

  const { isRecycleBin } = useIsRecycleBin();

  const { page } = usePage();

  const { rowsPerPage } = useRowsPerPage();

  const { products } = useProductsSelector((state) => state.products);

  const {
    dispatch: { translate },
  } = useLanguage();

  const { indexProductTypeName } = useExtraTypes();

  const [rows, setRows] = useState<Product[]>([]);

  // getting enabled or disabled rows
  useEffect(() => {
    if (isRecycleBin) {
      const disabledProducts = products.filter((row) => !row.enabled);
      setRows(disabledProducts);
    } else {
      const enabledProducts = products.filter((row) => row.enabled);
      setRows(enabledProducts);
    }
    dispatch(selectProduct(null));
    setFilter('');
  }, [view]);

  // filter function
  let filterRows = {} as Product[];
  if (filter.length !== 0) {
    filterRows = rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(filter.toLowerCase()) ||
        row.stock.toString().includes(filter) ||
        row.sale_price.toString().includes(filter) ||
        row.product_type_id
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        translate(indexProductTypeName(row.product_type_id))
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    });
  }

  return (
    <TableBody>
      {stableSort(filter ? filterRows : rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const labelId = `table-row-${index}`;

          return (
            <ProdTableContent
              row={row}
              labelId={labelId}
              key={labelId}
              columns={columns}
              isCollapse={isCollapse}
            />
          );
        })}
    </TableBody>
  );
}
