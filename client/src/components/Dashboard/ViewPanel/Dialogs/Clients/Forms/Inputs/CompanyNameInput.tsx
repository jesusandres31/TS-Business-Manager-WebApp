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
import { capitalize } from '../../../../../../../utils/capitalize';
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
import { textFieldVal } from '../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../common/Forms/Inputs';

interface CompanyNameInputProps {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function CompanyNameInput({
  error,
  setError,
  helperText,
  setHelperText,
}: CompanyNameInputProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { clientForm } = useClientFormSelector((state) => state.clientForm);

  const label = translate('company_name');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateClientForm({
        ...clientForm,
        company_name: capitalize(name),
      })
    );
    setError(false);
    setHelperText('');
  };

  return (
    <InputField
      id="company_name"
      name="cmpny-nm"
      label={label}
      required
      value={clientForm.company_name}
      onChange={handleInputChange}
      maxLength={80}
      error={
        (error && helperText.includes('Client')) ||
        textFieldVal(clientForm.company_name)
      }
      helperText={
        helperText.includes('Client')
          ? `❌ ${translate(helperText)}`
          : translate('companyOrPerson')
      }
    />
  );
}
