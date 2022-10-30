import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
// global state
import { useInvoicesSelector } from '../../../../../../features/invoices/invoicesSlice';
// context
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { Progress } from '../../../../../../common';

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  pinDialog: boolean;
  setPinDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, pinDialog, setPinDialog, ...other } =
    props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography component={'span'} variant="h6">
            {children}
          </Typography>
        </Grid>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </MuiDialogTitle>
  );
});

interface InvDialogHeaderProps {
  handleClose: () => void;
  pinDialog: boolean;
  setPinDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InvDialogHeader({
  handleClose,
  pinDialog,
  setPinDialog,
}: InvDialogHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoice } = useInvoicesSelector((state) => state.invoices);

  return (
    <DialogTitle
      id="alert-dialog-slide-title"
      onClose={handleClose}
      pinDialog={pinDialog}
      setPinDialog={setPinDialog}
    >
      <Typography variant="h6" gutterBottom>
        {invoice
          ? `${translate('update')} ${translate('_receipt')} [${
              invoice.id
            }] 📝✏️`
          : `${translate('create')} ${translate('_receipt')} 📝✔️`}
      </Typography>
    </DialogTitle>
  );
}
