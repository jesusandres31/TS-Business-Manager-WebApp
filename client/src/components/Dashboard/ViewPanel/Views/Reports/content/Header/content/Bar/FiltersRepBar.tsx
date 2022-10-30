import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import TodayIcon from '@material-ui/icons/Today';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
// hooks
import { useIsMobile } from '../../../../../../../../../hooks/useIsMobile';
import { useComeBackToFirstPage } from '../../../../../../common/hooks/useComeBackToFirstPage';
// context
import {
  useLanguage,
  localeMap,
} from '../../../../../../../../../context/LanguageContext';
// interface
import { IDate } from '../../../../../../../../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    picker: {
      width: 180,
    },
  })
);

interface FiltersRepBarProps {
  specificDate: Date | null;
  setSpecificDate: React.Dispatch<React.SetStateAction<Date | null>>;
  rangedDate: IDate;
  setRangedDate: React.Dispatch<React.SetStateAction<IDate>>;
}

export default function FiltersRepBar({
  specificDate,
  setSpecificDate,
  rangedDate,
  setRangedDate,
}: FiltersRepBarProps) {
  const classes = useStyles();

  const {
    state: { language },
    dispatch: { translate },
  } = useLanguage();

  const { comeBackToFirstPage } = useComeBackToFirstPage();

  const { isMobile } = useIsMobile();

  const [specificDateField, setSpecificDateField] = useState(true);

  const handleClean = () => {
    setSpecificDate(null);
    setRangedDate({ ...rangedDate, dateFrom: null, dateTo: null });
    comeBackToFirstPage();
  };

  const handleFilterBySpecificDate = () => {
    setSpecificDateField(!specificDateField);
    handleClean();
    comeBackToFirstPage();
  };

  const handleChangeSpecificDate = (newDate: Date | null) => {
    if (newDate) {
      setSpecificDate(newDate);
    }
    comeBackToFirstPage();
  };

  const handleChangeDateFrom = (newDate: Date | null) => {
    if (newDate) {
      setRangedDate({ ...rangedDate, dateFrom: newDate });
    }
    comeBackToFirstPage();
  };

  const handleChangeDateTo = (newDate: Date | null) => {
    if (newDate) {
      setRangedDate({ ...rangedDate, dateTo: newDate });
    }
    comeBackToFirstPage();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[language!]}>
      <FormControl fullWidth variant="outlined" size="small">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={3}>
            <Box mt={1} display="flex" justifyContent="flex-start">
              <Tooltip
                title={
                  specificDateField
                    ? translate('filterByRangeOfDate')
                    : translate('filterBySpecificDate')
                }
              >
                <IconButton
                  aria-label="filters"
                  size={isMobile ? 'small' : 'medium'}
                  onClick={handleFilterBySpecificDate}
                >
                  {specificDateField ? <TodayIcon /> : <InsertInvitationIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {specificDateField ? (
            <>
              <Grid item xs={12} sm={3}>
                <Box display="flex" justifyContent="center">
                  <KeyboardDatePicker
                    margin="normal"
                    id="filter-date-to"
                    label={`${translate('date')}:`}
                    format="dd/MM/yyyy"
                    size="small"
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    value={specificDate}
                    onChange={handleChangeSpecificDate}
                    className={classes.picker}
                    InputProps={{ readOnly: true }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={3}>
                <Box display="flex" justifyContent="center">
                  <KeyboardDatePicker
                    margin="normal"
                    id="filter-date-from"
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

              <Grid item xs={12} sm={3}>
                <Box display="flex" justifyContent="center">
                  <KeyboardDatePicker
                    margin="normal"
                    id="filter-date-to"
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
            </>
          )}

          <Grid item xs={12} sm={3}>
            <Box mt={1.5} display="flex" justifyContent="flex-start">
              <Tooltip title={translate('clean')}>
                <IconButton
                  aria-label="filters"
                  size={isMobile ? 'small' : 'medium'}
                  onClick={handleClean}
                >
                  <CancelPresentationRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </FormControl>
    </MuiPickersUtilsProvider>
  );
}
