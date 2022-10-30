import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      height: '100vh',
    },
  })
);

const Loading = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <CircularProgress disableShrink />
      </Grid>
    </Grid>
  );
  /* return (
    <div className={classes.content}>
      <Box component="span" my={8} pt={8}>
        <CircularProgress disableShrink />
      </Box>
    </div>
  ); */
};

export default Loading;
