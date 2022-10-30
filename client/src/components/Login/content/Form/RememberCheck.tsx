import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// context
import { useLanguage } from '../../../../context/LanguageContext';

interface RememberCheckProps {
  remember: boolean;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RememberCheck({
  remember,
  setRemember,
}: RememberCheckProps): JSX.Element {
  const {
    dispatch: { translate },
  } = useLanguage();

  const handleInputChange = () => {
    setRemember(!remember);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          value={remember}
          onChange={handleInputChange}
          color="primary"
        />
      }
      label={translate('remember')}
    />
  );
}
