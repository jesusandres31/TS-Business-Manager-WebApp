import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import {
  fetchProviders,
  useProvidersSelector,
} from '../../../../../../features/providers/providersSlice';
// common
import { Error401 } from '../../../../../../common';
// components
import { SimpleTable } from '../../../common/SimpleTable';
import { useStyles } from '../Statistics';
// children components
import ProductsByProviders from './content/ProductsByProviders';
import TotalSoldByProviders from './content/TotalSoldByProviders';
import ProductsSoldByProvider from './content/ProductsSoldByProvider';

export default function ProvidersStat() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { error } = useProvidersSelector((state) => state.providers);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  if (error) return <Error401 />;

  return (
    <SimpleTable>
      <Box m={2}>
        <TotalSoldByProviders classes={classes} />
        <Box pt={5} />
        <ProductsSoldByProvider classes={classes} />
        <Box pt={5} />
        <ProductsByProviders classes={classes} />
      </Box>
    </SimpleTable>
  );
}
