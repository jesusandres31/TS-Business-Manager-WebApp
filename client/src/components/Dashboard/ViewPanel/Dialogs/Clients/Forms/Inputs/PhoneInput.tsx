import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateClientForm,
  useClientFormSelector,
} from '../../../../../../../features/clients/clientFormSlice';
// common
import { NumberFormatPhone } from '../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// utils
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function PhoneInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { clientForm } = useClientFormSelector((state) => state.clientForm);

  const label = translate('phone');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateClientForm({
        ...clientForm,
        phone: name,
      })
    );
  };

  return (
    <InputField
      id="phone"
      name="phn"
      label={label}
      value={clientForm.phone}
      onChange={handleInputChange}
      maxLength={50}
      InputProps={{
        inputComponent: NumberFormatPhone as any,
      }}
    />
  );
}
