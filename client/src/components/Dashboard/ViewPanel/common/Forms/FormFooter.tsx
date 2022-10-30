import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MuiDialogActions from '@material-ui/core/DialogActions';
// context
import { useLanguage } from '../../../../../context/LanguageContext';

export const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface FormFooterProps {
  handleSubmit: () => void;
  buttonDisabled: boolean;
  openDialog: boolean;
  isUpdate: boolean;
}

export default function FormFooter({
  handleSubmit,
  buttonDisabled,
  openDialog,
  isUpdate,
}: FormFooterProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <DialogActions>
      <Tooltip
        title={
          buttonDisabled && openDialog ? translate('completeTheFields') : ''
        }
        arrow
        placement="left-end"
      >
        <span>
          <Button
            autoFocus
            color="primary"
            style={{ fontWeight: 600 }}
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            {isUpdate ? translate('confirm') : translate('create')}
          </Button>
        </span>
      </Tooltip>
    </DialogActions>
  );
}
