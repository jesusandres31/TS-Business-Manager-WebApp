import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
// context
import { useLanguage, localeMap } from '../../../../../context/LanguageContext';
// interface
import { IDate } from '../../../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    picker: {
      width: 180,
    },
  })
);

interface DateInputsProps {
  rangedDate: IDate;
  setRangedDate: React.Dispatch<React.SetStateAction<IDate>>;
  id: string;
}

export default function DateInputs({
  rangedDate,
  setRangedDate,
  id,
}: DateInputsProps) {
  const classes = useStyles();

  const {
    state: { language },
    dispatch: { translate },
  } = useLanguage();

  const handleChangeDateFrom = (newDate: Date | null) => {
    if (newDate) {
      setRangedDate({ ...rangedDate, dateFrom: newDate });
    }
  };

  const handleChangeDateTo = (newDate: Date | null) => {
    if (newDate) {
      setRangedDate({ ...rangedDate, dateTo: newDate });
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[language!]}>
      <FormControl fullWidth variant="outlined" size="small">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-start">
              <KeyboardDatePicker
                margin="normal"
                id={`filter-date-from-${id!}`}
                label={translate('from:')}
                format="dd/MM/yyyy"
                size="small"
                autoOk
                variant="inline"
                inputVariant="outlined"
                value={rangedDate.dateFrom}
                onChange={handleChangeDateFrom}
                className={classes.picker}
                InputProps={{ readOnly: true }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-start">
              <KeyboardDatePicker
                margin="normal"
                id={`filter-date-to-${id!}`}
                label={translate('to:')}
                format="dd/MM/yyyy"
                size="small"
                autoOk
                variant="inline"
                inputVariant="outlined"
                value={rangedDate.dateTo}
                onChange={handleChangeDateTo}
                className={classes.picker}
                InputProps={{ readOnly: true }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </FormControl>
    </MuiPickersUtilsProvider>
  );
}
