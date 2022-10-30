import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// context
import { useSnackbar } from '../context/SnackbarContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#323232',
      color: '#ffffff',
    },
  })
);

export default function GlobalSnackbar() {
  const classes = useStyles();

  const {
    state: { open, message },
    dispatch: { setSnackbar },
  } = useSnackbar();

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false, '');
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="secondary"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        ContentProps={{
          'aria-describedby': 'message-id',
          className: classes.root,
        }}
      />
    </div>
  );
}
