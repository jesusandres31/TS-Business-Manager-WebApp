import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateProviderForm,
  useProviderFormSelector,
} from '../../../../../../../features/providers/providerFormSlice';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// utils
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
import { textFieldVal } from '../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../common/Forms/Inputs';

interface TaxIdentifInputProps {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function TaxIdentifInput({
  error,
  setError,
  helperText,
  setHelperText,
}: TaxIdentifInputProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const label = translate('tax_id');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);

    dispatch(
      updateProviderForm({
        ...providerForm,
        tax_id: name,
      })
    );
    setError(false);
    setHelperText('');
  };

  return (
    <InputField
      id="tax_id"
      name="tx-id"
      label={label}
      value={providerForm.tax_id}
      onChange={handleInputChange}
      maxLength={50}
      error={
        (error && helperText.includes('tax_id')) ||
        textFieldVal(providerForm.tax_id)
      }
      helperText={
        helperText.includes('tax_id') ? `❌ ${translate(helperText)}` : ''
      }
    />
  );
}
