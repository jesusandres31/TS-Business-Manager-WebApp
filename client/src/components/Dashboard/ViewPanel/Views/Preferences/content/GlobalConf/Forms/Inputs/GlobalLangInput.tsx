import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  updateGlobalConfigForm,
  useProfileFormSelector,
} from '../../../../../../../../../features/profile/profileFormSlice';
// components
import { LangSelector } from '../../../../../../common/Selectors';

export default function GlobalLangSelector() {
  const dispatch = useAppDispatch();

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const handleLanguageChange = (event: ChangeEvent<{ value: unknown }>) => {
    dispatch(
      updateGlobalConfigForm({
        ...globalConfig,
        language: event.target.value as string,
      })
    );
  };

  return (
    <LangSelector
      handleLanguageChange={handleLanguageChange}
      value={globalConfig.language}
      style={{ minWidth: 190 }}
    />
  );
}
