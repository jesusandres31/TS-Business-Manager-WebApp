import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Typography from '@material-ui/core/Typography';
// context
import {
  useLanguage,
  localeMap,
} from '../../../../../../../../../../context/LanguageContext';
// interfce
import { IDate } from '../../../../../../../../../../interfaces';
// components
import { FormBody, StyledGrid } from '../../../../../../../common/Forms';

const useStyles = makeStyles(() =>
  createStyles({
    picker: {
      width: 200,
    },
  })
);

interface ArticlesToDistributeFormBodyProps {
  date: IDate;
  setDate: React.Dispatch<React.SetStateAction<IDate>>;
}

export default function ArticlesToDistributeFormBody({
  date,
  setDate,
}: ArticlesToDistributeFormBodyProps) {
  const classes = useStyles();

  const {
    state: { language },
    dispatch: { translate },
  } = useLanguage();

  const handleDateFromChange = (dateFrom: Date | null) => {
    if (dateFrom) {
      setDate({ ...date, dateFrom: dateFrom });
    }
  };

  const handleDateToChange = (dateTo: Date | null) => {
    if (dateTo) {
      setDate({ ...date, dateTo: dateTo });
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[language!]}>
      <FormBody>
        <>
          <Grid item xs={12} sm={12}>
            <Box pl={4} pt={2}>
              <Typography variant="h6">{translate('from:')}</Typography>
            </Box>
          </Grid>

          <StyledGrid item xs={12} sm={6}>
            <KeyboardDatePicker
              margin="normal"
              id="date-from"
              label={translate('dayFrom')}
              required
              format="dd/MM/yyyy"
              value={date.dateFrom}
              onChange={handleDateFromChange}
              autoOk
              variant="inline"
              inputVariant="outlined"
              size="small"
              className={classes.picker}
              InputProps={{ readOnly: true }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </StyledGrid>

          <StyledGrid item xs={12} sm={6}>
            <KeyboardTimePicker
              margin="normal"
              id="time-from"
              ampm={false}
              label={translate('timeFrom')}
              required
              value={date.dateFrom}
              onChange={handleDateFromChange}
              autoOk
              variant="inline"
              inputVariant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
              className={classes.picker}
              keyboardIcon={<ScheduleIcon />}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </StyledGrid>

          <Grid item xs={12} sm={12}>
            <Box pl={4} pt={2}>
              <Typography variant="h6">{translate('to:')}</Typography>
            </Box>
          </Grid>

          <StyledGrid item xs={12} sm={6}>
            <KeyboardDatePicker
              margin="normal"
              id="date-to"
              label={translate('dayTo')}
              required
              format="dd/MM/yyyy"
              value={date.dateTo}
              onChange={handleDateToChange}
              autoOk
              variant="inline"
              inputVariant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
              className={classes.picker}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </StyledGrid>

          <StyledGrid item xs={12} sm={6}>
            <KeyboardTimePicker
              margin="normal"
              id="time-to"
              ampm={false}
              label={translate('timeTo')}
              required
              value={date.dateTo}
              onChange={handleDateToChange}
              autoOk
              variant="inline"
              inputVariant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
              className={classes.picker}
              keyboardIcon={<ScheduleIcon />}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </StyledGrid>
        </>
      </FormBody>
    </MuiPickersUtilsProvider>
  );
}
