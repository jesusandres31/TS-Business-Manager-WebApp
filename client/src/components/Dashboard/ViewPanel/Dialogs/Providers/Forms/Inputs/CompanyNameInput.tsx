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

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const label = translate('company_name');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateProviderForm({
        ...providerForm,
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
      value={providerForm.company_name}
      onChange={handleInputChange}
      maxLength={80}
      error={
        (error && helperText.includes('Provider')) ||
        textFieldVal(providerForm.company_name)
      }
      helperText={
        helperText.includes('Provider')
          ? `❌ ${translate(helperText)}`
          : translate('companyOrPerson')
      }
    />
  );
}
