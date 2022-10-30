import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(14),
    height: '100vh',
  },
}));

const Error = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Box component="span" my={8} pt={8}>
          <Typography variant="h1">Error 401</Typography>
          <Typography variant="h3">Unauthorized!</Typography>
        </Box>
      </div>
    </Container>
  );
};

export default Error;
