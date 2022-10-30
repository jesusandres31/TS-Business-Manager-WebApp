import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// global state
import { useAppDispatch } from '../../app/store';
import { useSettingsSelector } from '../../features/settings/settingsSlice';
import { resetSettingsForm } from '../../features/settings/settingsFormSlice';
// common
import Loading from '../../common/Loading';
// context
import { useLanguage } from '../../context/LanguageContext';
// hooks
import { useRoles } from '../../hooks/useRoles';
// children components
import GoBackButton from './content/GoBackButton';
import UpdateUserButton from './content/UpdateUserButton';
import UpdatePsswdButton from './content/UpdatePsswdButton';

interface SettingsProps {
  classes: any;
}

export default function Settings({ classes }: SettingsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { user } = useSettingsSelector((state) => state.settings);

  const { indexRoleName } = useRoles();

  const [label, setLabel] = React.useState('');

  const {
    dispatch: { translate },
  } = useLanguage();

  const [open, setOpen] = React.useState(false);

  const handleClickUser = () => {
    setLabel('username');
    setOpen(true);
  };

  const handleClickPsswd = () => {
    setLabel('password');
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(resetSettingsForm());
    setOpen(false);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Box alignItems="center">
          {Object.keys(user).length === 0 ? (
            <Box pt={10}>
              <Loading />
            </Box>
          ) : (
            <>
              <Container component="main" maxWidth="xl">
                <Box pt={3} pb={3} display="flex" justifyContent="flex-end">
                  <GoBackButton />
                </Box>

                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box pt={0} pb={0} alignItems="center">
                    <Paper variant="outlined" className={classes.paper}>
                      <Grid className={classes.grid}>
                        {
                          <Grid item xs={12} sm={6}>
                            <Box py={3}>
                              <Typography variant="h5">
                                {translate('yourAccount')}
                              </Typography>
                            </Box>
                          </Grid>
                        }

                        {/* <Avatar className={classes.avatar}>
                          <AccountCircleIcon />
                        </Avatar> */}

                        <Grid item xs={12} sm={6}>
                          <Box py={1}>
                            <Divider variant="middle" />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <Box pt={3}>
                            <Typography
                              variant="h6"
                              className={classes.typography}
                            >
                              {`👤 ${translate('username')}:`}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              className={classes.typography}
                            >
                              {user.username}
                            </Typography>
                          </Box>

                          <Box py={1}>
                            <Typography
                              variant="h6"
                              className={classes.typography}
                            >
                              {`💻 ${translate('role')}:`}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              className={classes.typography}
                            >
                              {translate(indexRoleName(user.role_id))}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                          <Box py={3} display="flex">
                            <UpdateUserButton
                              open={open}
                              handleClickOpen={handleClickUser}
                              handleClose={handleClose}
                              label={label}
                              classes={classes}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                          <Box py={3} display="flex">
                            <UpdatePsswdButton
                              open={open}
                              handleClickOpen={handleClickPsswd}
                              handleClose={handleClose}
                              label={label}
                              classes={classes}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </Container>
              </Container>
            </>
          )}
        </Box>
      </Paper>
    </>
  );
}
