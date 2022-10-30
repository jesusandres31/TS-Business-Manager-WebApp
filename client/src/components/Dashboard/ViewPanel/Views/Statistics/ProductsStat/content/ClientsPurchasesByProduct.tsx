import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { IClientsPurchasesByProduct } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// components
import ClientsPurchasesByProductChart from './ClientsPurchasesByProduct/ClientsPurchasesByProductChart';
import ClientsPurchasesByProductFilter from './ClientsPurchasesByProduct/ClientsPurchasesByProductFilter';
import ProductInput from './ClientsPurchasesByProduct/ProductInput';

interface ClientsPurchasesByProductProps {
  classes: any;
}

export default function ClientsPurchasesByProduct({
  classes,
}: ClientsPurchasesByProductProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [clientsPurchasesByProduct, setClientsPurchasesByProduct] = useState<
    IClientsPurchasesByProduct[]
  >([]);

  const [productId, setProductId] = useState<number | null>(null);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('percentageOfClientsPerProducts')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ProductInput productId={productId} setProductId={setProductId} />
          </Box>
        </Grid>

        <ClientsPurchasesByProductFilter
          setClientsPurchasesByProduct={setClientsPurchasesByProduct}
          productId={productId}
        />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ClientsPurchasesByProductChart
              clientsPurchasesByProduct={clientsPurchasesByProduct}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
