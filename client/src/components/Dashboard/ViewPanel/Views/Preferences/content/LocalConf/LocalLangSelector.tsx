import { ChangeEvent } from 'react';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// utils
import { setLanguageInLS } from '../../../../../../../utils/browser';
// components
import { LangSelector } from '../../../../common/Selectors';

export default function LocalLangSelector() {
  const {
    state: { language },
    dispatch: { setLanguage },
  } = useLanguage();

  const handleLanguageChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
    setLanguageInLS(JSON.parse(JSON.stringify(event.target.value)));
  };

  return (
    <LangSelector
      handleLanguageChange={handleLanguageChange}
      value={language}
    />
  );
}
