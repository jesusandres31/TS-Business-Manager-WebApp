import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateClientForm,
  useClientFormSelector,
} from '../../../../../../../features/clients/clientFormSlice';
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

  const { clientForm } = useClientFormSelector((state) => state.clientForm);

  const label = translate('tax_id');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateClientForm({
        ...clientForm,
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
      value={clientForm.tax_id}
      onChange={handleInputChange}
      maxLength={50}
      error={
        (error && helperText.includes('tax_id')) ||
        textFieldVal(clientForm.tax_id)
      }
      helperText={
        helperText.includes('tax_id') ? `❌ ${translate(helperText)}` : ''
      }
    />
  );
}
