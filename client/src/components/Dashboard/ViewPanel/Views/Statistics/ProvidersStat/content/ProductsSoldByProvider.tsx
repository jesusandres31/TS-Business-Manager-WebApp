import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { IProductsSoldByProvider } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// components
import ProductsSoldByProviderChart from './ProductsSoldByProvider/ProductsSoldByProviderChart';
import ProductsSoldByProviderFilter from './ProductsSoldByProvider/ProductsSoldByProviderFilter';
import ProviderInput from './ProductsSoldByProvider/ProviderInput';

interface ProductsSoldByProviderProps {
  classes: any;
}

export default function ProductsSoldByProvider({
  classes,
}: ProductsSoldByProviderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [productsSoldByProvider, setProductsSoldByProvider] = useState<
    IProductsSoldByProvider[]
  >([]);

  const [providerId, setProviderId] = useState<number | null>(null);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('percentageOfProductsPerProviders')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ProviderInput
              providerId={providerId}
              setProviderId={setProviderId}
            />
          </Box>
        </Grid>

        <ProductsSoldByProviderFilter
          setProductsSoldByProvider={setProductsSoldByProvider}
          providerId={providerId}
        />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <ProductsSoldByProviderChart
              productsSoldByProvider={productsSoldByProvider}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
