import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateProductForm,
  useProductFormSelector,
} from '../../../../../../../features/products/productFormSlice';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// utils
import { capitalize } from '../../../../../../../utils/capitalize';
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
import { textFieldVal } from '../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../common/Forms/Inputs';

interface NameInputProps {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function NameInput({
  error,
  setError,
  helperText,
  setHelperText,
}: NameInputProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const label = translate('productName');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateProductForm({
        ...productForm,
        name: capitalize(name),
      })
    );
    setError(false);
    setHelperText('');
  };

  return (
    <InputField
      id="name"
      name="nm-prd"
      label={label}
      required
      value={productForm.name}
      onChange={handleInputChange}
      maxLength={80}
      error={
        (error && helperText.includes('Product')) ||
        textFieldVal(productForm.name)
      }
      helperText={
        helperText.includes('Product') ? `❌ ${translate(helperText)}` : ''
      }
    />
  );
}
