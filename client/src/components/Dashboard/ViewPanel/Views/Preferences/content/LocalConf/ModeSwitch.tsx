import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// utils
import { setDarkModeInLS } from '../../../../../../../utils/browser';
// context
import { useDarkMode } from '../../../../../../../context/ModeContext';
import { useLanguage } from '../../../../../../../context/LanguageContext';

export default function ModeSwitch() {
  const { darkMode, setDarkMode } = useDarkMode();

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    setDarkModeInLS(JSON.parse(JSON.stringify(!darkMode)));
  };

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={handleThemeChange} />}
      label={translate('darkMode')}
      labelPlacement="end"
    />
  );
}
