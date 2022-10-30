import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  updateInvoiceDetailForm,
  useInvoiceDetailFormSelector,
} from '../../../../../../../../features/invoices/invoiceDetailFormSlice';
// utils
import { calculateSubtotal } from '../../../../../../../../utils/calculateSubtotal';
// hooks
import { useIsProductTypeUnit } from '../../../../../common/hooks/useIsProductTypeUnit';
// common
import { NumberFormat2Dec } from '../../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

export default function UnitsInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { isProductTypeUnit } = useIsProductTypeUnit();

  const label = translate('units');

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let units = e.target.value;
    let subtotal = invoiceDetailForm.subtotal;
    if (isProductTypeUnit) {
      subtotal = calculateSubtotal(invoiceDetailForm.unit_price, units);
    }
    // updating...
    dispatch(
      updateInvoiceDetailForm({
        ...invoiceDetailForm,
        [e.target.name]: units,
        subtotal: subtotal,
      })
    );
  };

  return (
    <TextField
      id="units"
      name="units"
      variant="outlined"
      size="small"
      autoComplete="off"
      style={{ width: 150 }}
      label={label}
      required={isProductTypeUnit ? true : false}
      value={invoiceDetailForm.units}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormat2Dec as any,
      }}
      inputProps={{
        maxLength: 6,
      }}
      disabled={invoiceDetailForm.product_id === ''}
    />
  );
}
