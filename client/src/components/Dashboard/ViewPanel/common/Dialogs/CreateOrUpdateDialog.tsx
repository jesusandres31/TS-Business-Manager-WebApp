import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
// common
import { Progress } from '../../../../../common';

const useStyles = makeStyles(() =>
  createStyles({
    segment: {
      height: 4,
    },
  })
);

interface CreateOrUpdateDialogProps {
  openDialog: boolean;
  handleClose: () => void;
  loading: boolean;
  children: JSX.Element[];
}

export default function CreateOrUpdateDialog({
  openDialog,
  handleClose,
  loading,
  children,
}: CreateOrUpdateDialogProps) {
  const classes = useStyles();

  return (
    <Dialog
      open={openDialog}
      keepMounted
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="simple-dialog"
    >
      {children[0]}

      {loading ? (
        <Progress />
      ) : (
        <>{/* <div className={classes.segment}></div> */}</>
      )}

      {children[1]}

      {children[2]}
    </Dialog>
  );
}
