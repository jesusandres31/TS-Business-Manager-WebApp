import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiDialogContent from '@material-ui/core/DialogContent';

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxHeight: 350,
      minHeight: 150,
      minWidth: 150,
      maxWidth: 550,
    },
  })
);

interface FormBodyProps {
  children: JSX.Element;
}

export default function FormBody({ children }: FormBodyProps) {
  const classes = useStyles();

  return (
    <DialogContent dividers className={classes.root}>
      <Grid container spacing={0}>
        {children}
      </Grid>
    </DialogContent>
  );
}
