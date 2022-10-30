import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { IProductsSoldByClient } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// components
import ProductsSoldByClientChart from './ProductsSoldByClient/ProductsSoldByClientChart';
import ProductsSoldByClientFilter from './ProductsSoldByClient/ProductsSoldByClientFilter';
import ClientInput from './ProductsSoldByClient/ClientInput';

interface ProductsSoldByClientProps {
  classes: any;
}

export default function ProductsSoldByClient({
  classes,
}: ProductsSoldByClientProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [productsSoldByClient, setProductsSoldByClient] = useState<
    IProductsSoldByClient[]
  >([]);

  const [clientId, setClientId] = useState<number | null>(null);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('percentageOfProductsPerClients')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ClientInput clientId={clientId} setClientId={setClientId} />
          </Box>
        </Grid>

        <ProductsSoldByClientFilter
          setProductsSoldByClient={setProductsSoldByClient}
          clientId={clientId}
        />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ProductsSoldByClientChart
              productsSoldByClient={productsSoldByClient}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
