import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { useProductsSelector } from '../../../../../../../../features/products/productsSlice';
import {
  updateInvoiceDetailForm,
  useInvoiceDetailFormSelector,
  resetInvoiceDetailForm,
} from '../../../../../../../../features/invoices/invoiceDetailFormSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';
import { useProduct } from '../../../../../../../../hooks/useProduct';

export default function ProductInput() {
  const dispatch = useAppDispatch();

  const { isMobile } = useIsMobile();

  const { indexProductName, indexProductSalePrice } = useProduct();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { products } = useProductsSelector((state) => state.products);

  // get enabled products
  const enabledProducts = products.filter((row) => row.enabled);
  // sorting
  enabledProducts.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  const label = translate('product');

  const handleInputChange = (
    e: ChangeEvent<{}>,
    productId: number | null,
    reason: any
  ) => {
    if (reason === 'clear') {
      dispatch(resetInvoiceDetailForm());
    } else {
      let unitPriceValue = indexProductSalePrice(productId as number);
      // updating...
      dispatch(
        updateInvoiceDetailForm({
          ...invoiceDetailForm,
          product_id: productId as number,
          unit_price: unitPriceValue,
          units: '',
          amount: '',
          fee_percentage: '',
          subtotal: '',
        })
      );
    }
  };

  return (
    <Autocomplete
      id="inv-art"
      size="small"
      options={enabledProducts.map((row) => {
        return row.id;
      })}
      getOptionLabel={(option) => indexProductName(option)}
      value={
        invoiceDetailForm.product_id === ''
          ? null
          : (invoiceDetailForm.product_id as number)
      }
      onChange={handleInputChange}
      noOptionsText={translate('noResults')}
      style={{ width: isMobile ? 240 : 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          required
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          autoComplete="off"
        />
      )}
    />
  );
}
