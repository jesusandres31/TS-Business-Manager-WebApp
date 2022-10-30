import { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// global state
import { useProductsSelector } from '../../../../../../../../../../features/products/productsSlice';
// context
import { useLanguage } from '../../../../../../../../../../context/LanguageContext';
import { useFilter } from '../../../../../../../common/context/FilterContext';
// interface
import { Product } from '../../../../../../../../../../api/product.services';
// hooks
import { useExtraTypes } from '../../../../../../../../../../hooks/useExtraTypes';
// utils
import { removeDecZeros } from '../../../../../../../../../../utils/removeDecZeros';
import {
  Order,
  stableSort,
  getComparator,
} from '../../../../../../../../../../utils/sorting';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: 655,
    },
    container: {
      height: '55vh',
      maxWidth: 665,
    },
    row: {
      height: '6.5vh',
    },
  })
);

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
];

interface SearchProductTableProps {
  selectedItem: string | number;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | number>>;
  searchProductDialog: boolean;
}

export default function SearchProductTable({
  selectedItem,
  setSelectedItem,
  searchProductDialog,
}: SearchProductTableProps) {
  const classes = useStyles();

  const [order] = useState<Order>('asc');
  const [orderBy] = useState('name');

  const [rows, setRows] = useState<Product[]>([]);

  const { filter, setFilter } = useFilter();

  // getting enabled or disabled rows
  useEffect(() => {
    if (searchProductDialog) {
      const enabledProducts = products.filter((row) => row.enabled);
      setRows(enabledProducts);
      setFilter('');
    }
  }, [searchProductDialog]);

  // filter function
  let filterRows = {} as Product[];
  if (filter.length !== 0) {
    filterRows = rows.filter((row) => {
      return row.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  const {
    dispatch: { translate },
  } = useLanguage();

  const { indexProductTypeName } = useExtraTypes();

  const { products } = useProductsSelector((state) => state.products);

  const handleClick = (row: Product) => {
    if (row.id === selectedItem) {
      setSelectedItem('');
    } else {
      setSelectedItem(row.id);
    }
  };

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table className={classes.table} size="small" stickyHeader>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell padding="checkbox" />
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  <Box fontWeight="fontWeightBold">
                    {translate(column.label)}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(
              filter ? filterRows : rows,
              getComparator(order, orderBy)
            ).map((row: Product) => (
              <TableRow
                hover
                key={row.id}
                className={classes.row}
                selected={row.id === selectedItem}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={row.id === selectedItem}
                    onClick={(e) => handleClick(row)}
                  />
                </TableCell>
                {columns.map((column) => {
                  let value: string | number = row[column.id];

                  // getting name of product_type_id
                  if (
                    column.id === 'product_type_id' &&
                    typeof value === 'number'
                  ) {
                    value = translate(indexProductTypeName(value));
                  }

                  // removing zeros decimals from stock
                  if (column.id === 'stock') {
                    value = removeDecZeros(value);
                  }

                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
