import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import {
  fetchProducts,
  useProductsSelector,
} from '../../../../../../features/products/productsSlice';
// common
import { Error401 } from '../../../../../../common';
// components
import { SimpleTable } from '../../../common/SimpleTable';
import { useStyles } from '../Statistics';
// children components
import ProductsByInvoice from './content/ProductsByInvoice';
import ClientsPurchasesByProduct from './content/ClientsPurchasesByProduct';

export default function ProductsStat() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { error } = useProductsSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) return <Error401 />;

  return (
    <SimpleTable>
      <Box m={2}>
        <ProductsByInvoice classes={classes} />
        <Box pt={5} />
        <ClientsPurchasesByProduct classes={classes} />
      </Box>
    </SimpleTable>
  );
}
