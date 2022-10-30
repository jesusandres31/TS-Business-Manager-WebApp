import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  typography: {
    display: 'inline-block',
    paddingLeft: '10px',
  },
}));
