import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { IClientsByInvoices } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// child components
import ClientsByInvoicesChart from './ClientsByInvoices/ClientsByInvoicesChart';
import ClientsByInvoicesFilter from './ClientsByInvoices/ClientsByInvoicesFilter';

interface ClientsByInvoicesProps {
  classes: any;
}

export default function ClientsByInvoices({ classes }: ClientsByInvoicesProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [clientsByInvoices, setClientsByInvoices] = useState<
    IClientsByInvoices[]
  >([]);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('amountOfPurchasesPerClients')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <ClientsByInvoicesFilter setClientsByInvoices={setClientsByInvoices} />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ClientsByInvoicesChart clientsByInvoices={clientsByInvoices} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
