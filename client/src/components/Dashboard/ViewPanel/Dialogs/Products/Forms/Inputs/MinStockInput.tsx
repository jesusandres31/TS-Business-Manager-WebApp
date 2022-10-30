import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateProductForm,
  useProductFormSelector,
} from '../../../../../../../features/products/productFormSlice';
// common
import { NumberFormat2Dec } from '../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function MinStockInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const label = translate('minStockInUnits');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateProductForm({
        ...productForm,
        min_stock: e.target.value,
      })
    );
  };

  return (
    <InputField
      id="min_stock"
      name="min_stck"
      label={label}
      value={productForm.min_stock}
      onChange={handleInputChange}
      maxLength={10}
      InputProps={{
        inputComponent: NumberFormat2Dec as any,
      }}
    />
  );
}
