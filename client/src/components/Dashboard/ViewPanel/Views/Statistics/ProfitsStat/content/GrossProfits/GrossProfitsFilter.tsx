import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { fetchGrossProfits } from '../../../../../../../../features/statistics/statisticsSlice';
// interface
import { IDate } from '../../../../../../../../interfaces';
import { IProfits } from '../../../../../../../../api/statistic.services';
// utils
import {
  formatDateFrom,
  formatDateTo,
} from '../../../../../../../../utils/formatDate';
// hooks
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../../context/SnackbarContext';
// components
import { DateInputs } from '../../../../../common/Statistics';

interface GrossProfitsFilterProps {
  setGrossProfits: React.Dispatch<React.SetStateAction<IProfits>>;
}

export default function GrossProfitsFilter({
  setGrossProfits,
}: GrossProfitsFilterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const [rangedDate, setRangedDate] = useState<IDate>({
    dateFrom: null,
    dateTo: null,
  });

  const handleFetchGrossProfits = (formatedDate: IDate) => {
    dispatch(fetchGrossProfits(formatedDate))
      .then(unwrapResult)
      .then((payload) => {
        setGrossProfits(payload);
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    handleRemoveFilter();
  }, []);

  const handleFilter = () => {
    const formatedDate: IDate = {
      dateFrom: formatDateFrom(rangedDate.dateFrom as Date),
      dateTo: formatDateTo(rangedDate.dateTo as Date),
    };
    handleFetchGrossProfits(formatedDate);
  };

  const handleRemoveFilter = () => {
    setGrossProfits({ total: 0 });
    setRangedDate({ ...rangedDate, dateFrom: null, dateTo: null });
  };

  return (
    <>
      <Grid item xs={12} sm={5}>
        <Box pt={0}>
          <DateInputs
            rangedDate={rangedDate}
            setRangedDate={setRangedDate}
            id={'GrossProfits'}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Box pt={2.5} display="flex" justifyContent="flex-start">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleFilter}
            disabled={
              rangedDate.dateFrom === null || rangedDate.dateTo === null
            }
          >
            {translate('filter')}
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Box
          pt={2.5}
          display="flex"
          justifyContent={isMobile ? 'flex-start' : 'flex-end'}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleRemoveFilter}
            disabled={
              rangedDate.dateFrom === null && rangedDate.dateTo === null
            }
          >
            {translate('removeFilter')}
          </Button>
        </Box>
      </Grid>
    </>
  );
}
