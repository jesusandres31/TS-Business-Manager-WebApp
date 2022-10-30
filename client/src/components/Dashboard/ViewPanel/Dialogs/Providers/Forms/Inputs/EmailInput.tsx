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
import { emailVal } from '../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function EmailInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const label = translate('email');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateProviderForm({
        ...providerForm,
        email: name,
      })
    );
  };

  return (
    <InputField
      id="email"
      name="liame"
      label={label}
      value={providerForm.email}
      onChange={handleInputChange}
      maxLength={50}
      error={emailVal(providerForm.email)}
    />
  );
}
