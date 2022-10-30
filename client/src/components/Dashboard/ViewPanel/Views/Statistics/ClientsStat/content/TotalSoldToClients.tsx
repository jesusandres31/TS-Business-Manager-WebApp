import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { ITotalSoldToClients } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// components
import TotalSoldToClientsChart from './TotalSoldToClients/TotalSoldToClientsChart';
import TotalSoldToClientsFilter from './TotalSoldToClients/TotalSoldToClientsFilter';

interface TotalSoldToClientsProps {
  classes: any;
}

export default function TotalSoldToClients({
  classes,
}: TotalSoldToClientsProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [totalSoldToClients, setTotalSoldToClients] = useState<
    ITotalSoldToClients[]
  >([]);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h6" className={classes.typography}>
          {translate('totalSoldPerClients')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <TotalSoldToClientsFilter
          setTotalSoldToClients={setTotalSoldToClients}
        />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={2}>
            <TotalSoldToClientsChart totalSoldToClients={totalSoldToClients} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
