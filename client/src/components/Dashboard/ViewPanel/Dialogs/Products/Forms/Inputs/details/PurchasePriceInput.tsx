import { ChangeEvent, useEffect } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  useProductFormSelector,
  updateProductForm,
} from '../../../../../../../../features/products/productFormSlice';
// common
import { NumberFormat2Zeros } from '../../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useProviderDetail } from '../../../../../../../../hooks/useProviderDetail';
// components
import { InputField } from '../../../../../common/Forms/Inputs';

interface PurchasePriceInputProps {
  index: number;
}

export default function PurchasePriceInput({ index }: PurchasePriceInputProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { indexProviderCompanyName } = useProviderDetail();

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const label = `${translate('purchasePrice')} (${indexProviderCompanyName(
    productForm.provider_details[index].provider_id as number
  )})`;

  useEffect(() => {
    if (productForm.provider_details[index].provider_id === '') {
      // create updated copy
      let newArray = [...productForm.provider_details];
      newArray[index] = {
        ...newArray[index],
        purchase_price: '',
      };
      // updating...
      dispatch(
        updateProductForm({
          ...productForm,
          provider_details: newArray,
        })
      );
    }
  }, [productForm.provider_details[index].provider_id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // create updated copy
    let newArray = [...productForm.provider_details];
    newArray[index] = {
      ...newArray[index],
      purchase_price: e.target.value,
    };
    // updating...
    dispatch(
      updateProductForm({
        ...productForm,
        provider_details: newArray,
      })
    );
  };

  return (
    <InputField
      id={`purchase-price${index}`}
      name="prchs-prc"
      label={label}
      required
      value={productForm.provider_details[index].purchase_price}
      onChange={handleInputChange}
      maxLength={12}
      disabled={productForm.provider_details[index].provider_id === ''}
      InputProps={{
        inputComponent: NumberFormat2Zeros as any,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  );
}
