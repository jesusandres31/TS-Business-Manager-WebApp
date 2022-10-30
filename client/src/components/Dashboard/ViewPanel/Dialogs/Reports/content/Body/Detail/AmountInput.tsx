import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  updateInvoiceDetailForm,
  useInvoiceDetailFormSelector,
} from '../../../../../../../../features/invoices/invoiceDetailFormSlice';
// common
import { NumberFormat3Dec } from '../../../../../../../../common/NumberFormatCustom';
// hooks
import { useProduct } from '../../../../../../../../hooks/useProduct';
import { useExtraTypes } from '../../../../../../../../hooks/useExtraTypes';
import { useIsProductTypeUnit } from '../../../../../common/hooks/useIsProductTypeUnit';
// utils
import { calculateSubtotal } from '../../../../../../../../utils/calculateSubtotal';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

export default function AmountInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { indexProductTypeId } = useProduct();

  const { indexProductTypeName } = useExtraTypes();

  const { isProductTypeUnit } = useIsProductTypeUnit();

  const label = translate('amount');

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isProductTypeUnit) {
      let amount = e.target.value;
      let subtotal: number = calculateSubtotal(
        invoiceDetailForm.unit_price,
        amount
      );
      // updating...
      dispatch(
        updateInvoiceDetailForm({
          ...invoiceDetailForm,
          [e.target.name]: amount,
          subtotal: subtotal,
        })
      );
    }
  };

  return (
    <TextField
      id="amount"
      name="amount"
      variant="outlined"
      size="small"
      autoComplete="off"
      style={{ width: 150 }}
      label={label}
      required={isProductTypeUnit ? false : true}
      value={invoiceDetailForm.amount}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormat3Dec as any,
        endAdornment: (
          <InputAdornment position="start">
            {invoiceDetailForm.product_id
              ? translate(
                  indexProductTypeName(
                    indexProductTypeId(
                      invoiceDetailForm.product_id as number
                    ) as number
                  )
                )
              : ''}
          </InputAdornment>
        ),
      }}
      inputProps={{
        maxLength: 10,
      }}
      disabled={invoiceDetailForm.product_id === ''}
    />
  );
}
