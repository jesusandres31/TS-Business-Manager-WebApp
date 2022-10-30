import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// context
import { useLanguage } from '../../context/LanguageContext';
// children components
import Copyright from './content/Copyright';
import MainForm from './content/MainForm';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function SignIn(): JSX.Element {
  const classes = useStyles();

  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <Paper>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box pt={5}>
          <div className={classes.content}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {translate('signin')}
            </Typography>
            <MainForm />
            <Box pt={8} pb={2}>
              <Copyright />
            </Box>
          </div>
        </Box>
      </Container>
    </Paper>
  );
}
