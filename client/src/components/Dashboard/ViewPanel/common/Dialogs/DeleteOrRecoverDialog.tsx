import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// hooks
import { useIsRecycleBin } from '../hooks/useIsRecycleBin';
// context
import { useLanguage } from '../../../../../context/LanguageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: theme.palette.primary.main,
    },
  })
);

interface DeleteOrRecoverDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  confirMessage: string;
  alertMessage: string;
}

export default function DeleteOrRecoverDialog({
  openDialog,
  setOpenDialog,
  handleSubmit,
  confirMessage,
  alertMessage,
}: DeleteOrRecoverDialogProps) {
  const classes = useStyles();

  const { isRecycleBin } = useIsRecycleBin();

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      keepMounted
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="simple-dialog"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {isRecycleBin ? `${confirMessage} 📋` : `${confirMessage} 🗑️`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {isRecycleBin ? translate('youCanUseItAgain') : `${alertMessage}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          style={{ fontWeight: 600 }}
          onClick={handleClose}
        >
          {translate('cancel')}
        </Button>
        <Button
          className={classes.button}
          style={{ fontWeight: 600 }}
          onClick={handleSubmit}
        >
          {isRecycleBin ? translate('recover') : translate('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
