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

export default function SurnameInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { clientForm } = useClientFormSelector((state) => state.clientForm);

  const label = translate('managerSurname');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateClientForm({
        ...clientForm,
        surname: capitalize(name),
      })
    );
  };

  return (
    <InputField
      id="surname"
      name="emanrus"
      label={label}
      value={clientForm.surname}
      onChange={handleInputChange}
      maxLength={50}
      error={textFieldVal(clientForm.surname)}
    />
  );
}
