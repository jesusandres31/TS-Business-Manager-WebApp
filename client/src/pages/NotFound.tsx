import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
    height: '100vh',
  },
}));

export default function NotFound(): JSX.Element {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box component="span" my={8} pt={8}>
          <Typography variant="h1">404</Typography>
          <Typography variant="h3">Page Not Found!</Typography>
        </Box>
        <Box mx={4} my={4}>
          <Link color="inherit" href="/">
            Go Home
          </Link>
        </Box>
      </div>
    </Container>
  );
}
