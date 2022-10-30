import { makeStyles } from '@material-ui/core/styles';
// children components
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  root: { height: '100vh' },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: '500px',
  },
  container: {
    alignItems: 'center',
  },
  paper: {
    maxHeight: '500px',
    maxWidth: '500px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  typography: {
    display: 'inline-block',
    paddingLeft: '10px',
  },
  button: {
    maxWidth: 150,
  },
}));

export default function Main(): JSX.Element {
  const classes = useStyles();

  return <Settings classes={classes} />;
}
