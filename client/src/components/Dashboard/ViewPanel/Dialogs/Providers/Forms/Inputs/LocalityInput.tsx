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

export default function LocalityInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const label = translate('locality');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(capitalize(e.target.value));
    dispatch(
      updateProviderForm({
        ...providerForm,
        locality: name,
      })
    );
  };

  return (
    <InputField
      id="locality"
      name="lclty"
      label={label}
      value={providerForm.locality}
      onChange={handleInputChange}
      maxLength={50}
      error={textFieldVal(providerForm.locality)}
    />
  );
}
