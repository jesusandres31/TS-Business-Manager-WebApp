import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import { fetchProductsByProviders } from '../../../../../../../features/statistics/statisticsSlice';
// interface
import { IProductsByProviders } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../context/SnackbarContext';
// child components
import ProductsByProvidersChart from './ProductsByProviders/ProductsByProvidersChart';

interface ProductsByProvidersProps {
  classes: any;
}

export default function ProductsByProviders({
  classes,
}: ProductsByProvidersProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const [productsByProviders, setProductsByProviders] = useState<
    IProductsByProviders[]
  >([]);

  const handleFetchProductsByProviders = () => {
    dispatch(fetchProductsByProviders())
      .then(unwrapResult)
      .then((payload) => {
        setProductsByProviders(payload);
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    handleFetchProductsByProviders();
  }, []);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('numberOfProductsPerProviders')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ProductsByProvidersChart
              productsByProviders={productsByProviders}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
