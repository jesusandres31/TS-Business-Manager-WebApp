import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// global context
import { useAppDispatch } from '../../../app/store';
import { resetSettingsForm } from '../../../features/settings/settingsFormSlice';
// context
import { useLanguage } from '../../../context/LanguageContext';
// children components

export default function GoBackButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleBackClick = () => {
    dispatch(resetSettingsForm());
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      component={Link}
      to="/dashboard"
      onClick={handleBackClick}
    >
      {translate('goBack')}
    </Button>
  );
}
