import Button from '@material-ui/core/Button';
// context
import { useLanguage } from '../../../context/LanguageContext';
// children components
import UpdateUserOrPsswdDialog from './Dialogs/UpdateUserOrPsswdDialog';

interface UpdatePsswdButtonProps {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  label: string;
  classes: any;
}

export default function UpdatePsswdButton({
  open,
  handleClickOpen,
  handleClose,
  label,
  classes,
}: UpdatePsswdButtonProps): JSX.Element {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        color="primary"
        className={classes.button}
      >
        {`${translate('update')} ${translate('password')}`}
      </Button>
      <UpdateUserOrPsswdDialog
        open={open}
        handleClose={handleClose}
        label={label}
      />
    </>
  );
}
