import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import { fetchTotalDebts } from '../../../../../../../features/statistics/statisticsSlice';
// interface
import { IProfits } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../context/SnackbarContext';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface TotalDebtsProps {
  classes: any;
}

export default function TotalDebts({ classes }: TotalDebtsProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const [totalDebts, setTotalDebts] = useState<IProfits>({
    total: 0,
  });

  const handleFetchTotalDebts = () => {
    dispatch(fetchTotalDebts())
      .then(unwrapResult)
      .then((payload) => {
        setTotalDebts(payload);
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    handleFetchTotalDebts();
  }, []);

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h4" className={classes.typography}>
          {translate('totalDebts')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={6}>
            <Typography variant={isMobile ? 'h4' : 'h2'}>
              {`$ ${totalDebts.total ? totalDebts.total : 0}`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
