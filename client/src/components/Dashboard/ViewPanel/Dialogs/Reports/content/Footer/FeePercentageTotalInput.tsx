import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../features/invoices/invoiceFormSlice';
// common
import { NumberFormat2DecNeg } from '../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';

export default function FeePercentageTotalInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('total_fee_percentage');

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (invoiceForm.total) {
      if (!e.target.value) {
        let total = invoiceForm.report_details.reduce(
          (accum, detail) => accum + parseFloat(detail.subtotal as string),
          0
        );
        dispatch(
          updateInvoiceForm({
            ...invoiceForm,
            [e.target.name]: 0,
            total: total,
          })
        );
      } else {
        let feePercentage = e.target.value as string;
        if (!isNaN(parseFloat(feePercentage))) {
          let total = invoiceForm.report_details.reduce(
            (accum, detail) => accum + parseFloat(detail.subtotal as string),
            0
          );
          let alteredTotal = (
            total +
            (total * parseFloat(feePercentage)) / 100
          ).toFixed(2);
          // updating...
          dispatch(
            updateInvoiceForm({
              ...invoiceForm,
              [e.target.name]: feePercentage,
              total: alteredTotal,
            })
          );
        }
      }
    }
  };

  return (
    <TextField
      id="fee-percentageTotal"
      name="fee_percentageTotal"
      //variant="outlined"
      size="small"
      autoComplete="off"
      style={{ width: 150 }}
      label={label}
      required
      value={invoiceForm.fee_percentageTotal}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormat2DecNeg as any,
        endAdornment: <InputAdornment position="start">%</InputAdornment>,
      }}
      inputProps={{
        maxLength: 4,
      }}
      disabled={invoiceForm.report_details.length === 0}
    />
  );
}
