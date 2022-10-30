import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../../features/invoices/invoiceFormSlice';
// context
import {
  useLanguage,
  localeMap,
} from '../../../../../../../../context/LanguageContext';
// hooks
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    picker: {
      width: 180,
    },
  })
);

export default function CreatedTab() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { isMobile } = useIsMobile();

  const {
    state: { language },
    dispatch: { translate },
  } = useLanguage();

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const handleChangeDate = (newDate: Date | string | null) => {
    if (newDate) {
      dispatch(
        updateInvoiceForm({
          ...invoiceForm,
          created: newDate,
        })
      );
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[language!]}>
      <KeyboardDatePicker
        id="filter-date-to"
        name="created"
        label={translate('date')}
        required
        format="dd/MM/yyyy"
        size="small"
        style={{ width: isMobile ? 240 : 300 }}
        //style={{ width: 180 }}
        autoOk
        variant="inline"
        inputVariant="outlined"
        value={invoiceForm.created}
        onChange={handleChangeDate}
        className={classes.picker}
        InputProps={{ readOnly: true }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
