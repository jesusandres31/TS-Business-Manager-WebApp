import { unwrapResult } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
// global state
import { useAppDispatch } from '../../../../app/store';
import { signIn, useAuthSelector } from '../../../../features/auth/authSlice';
// interface
import { LoginForm } from '../../../../api/auth.services';
// context
import { useLanguage } from '../../../../context/LanguageContext';

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface SubmitButtonProps {
  form: LoginForm;
  remember: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SubmitButton({
  form,
  remember,
  setError,
  setHelperText,
}: SubmitButtonProps): JSX.Element {
  const classes = useStyles();

  const {
    dispatch: { translate },
  } = useLanguage();

  const dispatch = useAppDispatch();

  const { authLoading } = useAuthSelector((state) => state.auth);

  const handleSignIn = (formData: LoginForm, remember: boolean) => {
    if (
      formData.profile.length <= 1 ||
      formData.username.length <= 4 ||
      formData.password.length <= 4
    ) {
      setHelperText(`❌ ${translate('fillInAllTheFields')}`);
      setError(true);
    } else {
      dispatch(signIn({ formData, remember }))
        .then(unwrapResult)
        .catch((err) => {
          setHelperText(`❌ ${translate(err.message)}`);
          setError(true);
          throw err;
        });
    }
  };

  const handleSubmit = () => {
    handleSignIn(form, remember);
  };

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={handleSubmit}
    >
      {authLoading ? translate('signingin') : translate('singin')}
    </Button>
  );
}
