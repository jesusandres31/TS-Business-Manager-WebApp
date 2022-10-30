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

export default function StockInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('currentStockInUnits');

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProductForm({ ...productForm, stock: e.target.value }));
  };

  return (
    <InputField
      id="stock"
      name="stck"
      label={label}
      value={productForm.stock}
      onChange={handleInputChange}
      maxLength={10}
      InputProps={{
        inputComponent: NumberFormat2Dec as any,
      }}
    />
  );
}
