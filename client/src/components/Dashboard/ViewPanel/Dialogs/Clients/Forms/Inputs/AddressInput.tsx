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
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function AddressInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { clientForm } = useClientFormSelector((state) => state.clientForm);

  const label = translate('address');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateClientForm({
        ...clientForm,
        address: capitalize(name),
      })
    );
  };

  return (
    <InputField
      id="address"
      name="ddrss"
      label={label}
      value={clientForm.address}
      onChange={handleInputChange}
      maxLength={50}
    />
  );
}
