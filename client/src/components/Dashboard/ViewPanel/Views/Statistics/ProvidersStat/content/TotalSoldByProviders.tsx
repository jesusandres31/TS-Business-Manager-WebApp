import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { ITotalSoldByProviders } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// components
import TotalSoldByProvidersChart from './TotalSoldByProviders/TotalSoldByProvidersChart';
import TotalSoldByProvidersFilter from './TotalSoldByProviders/TotalSoldByProvidersFilter';

interface TotalSoldByProvidersProps {
  classes: any;
}

export default function TotalSoldByProviders({
  classes,
}: TotalSoldByProvidersProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [totalSoldByProviders, setTotalSoldByProviders] = useState<
    ITotalSoldByProviders[]
  >([]);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('totalSoldPerProviders')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <TotalSoldByProvidersFilter
          setTotalSoldByProviders={setTotalSoldByProviders}
        />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <TotalSoldByProvidersChart
              totalSoldByProviders={totalSoldByProviders}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
