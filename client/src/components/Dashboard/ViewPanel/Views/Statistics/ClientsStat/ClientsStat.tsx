import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import {
  fetchClients,
  useClientsSelector,
} from '../../../../../../features/clients/clientsSlice';
// common
import { Error401 } from '../../../../../../common';
// components
import { SimpleTable } from '../../../common/SimpleTable';
import { useStyles } from '../Statistics';
// children components
import ClientsByInvoices from './content/ClientsByInvoices';
import ProductsSoldByClient from './content/ProductsSoldByClient';
import TotalSoldToCliens from './content/TotalSoldToClients';

export default function ClientsStat() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { error } = useClientsSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  if (error) return <Error401 />;

  return (
    <SimpleTable>
      <Box m={2}>
        <ClientsByInvoices classes={classes} />
        <Box pt={5} />
        <ProductsSoldByClient classes={classes} />
        <Box pt={5} />
        <TotalSoldToCliens classes={classes} />
      </Box>
    </SimpleTable>
  );
}
