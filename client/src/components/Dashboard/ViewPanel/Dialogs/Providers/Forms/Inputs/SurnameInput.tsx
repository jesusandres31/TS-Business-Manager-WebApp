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

export default function SurnameInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const label = translate('managerSurname');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateProviderForm({
        ...providerForm,
        surname: capitalize(name),
      })
    );
  };

  return (
    <InputField
      id="surname"
      name="emanrus"
      label={label}
      value={providerForm.surname}
      onChange={handleInputChange}
      maxLength={50}
      error={textFieldVal(providerForm.surname)}
    />
  );
}
