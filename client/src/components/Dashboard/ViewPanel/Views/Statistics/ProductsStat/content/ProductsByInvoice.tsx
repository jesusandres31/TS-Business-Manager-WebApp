import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { IProductsByInvoice } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// child components
import ProductsByInvoiceChart from './ProductsByInvoice/ProductsByInvoiceChart';
import ProductsByInvoiceFilter from './ProductsByInvoice/ProductsByInvoiceFilter';

interface ProductsByInvoiceProps {
  classes: any;
}

export default function ProductsByInvoice({ classes }: ProductsByInvoiceProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [productsByInvoice, setProductsByInvoice] = useState<
    IProductsByInvoice[]
  >([]);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('amountOfSalesPerProducts')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <ProductsByInvoiceFilter setProductsByInvoice={setProductsByInvoice} />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ProductsByInvoiceChart productsByInvoice={productsByInvoice} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
