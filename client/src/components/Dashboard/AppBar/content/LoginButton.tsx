import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// global state
import { useAppDispatch } from '../../../../app/store';
import { signOut } from '../../../../features/auth/authSlice';
// context
import { useLanguage } from '../../../../context/LanguageContext';
import Typography from '@material-ui/core/Typography';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      minWidth: '40px',
    },
  })
);

export default function LoginButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(signOut());
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          <ListItemIcon className={classes.icon}>
            <PersonOutlineRoundedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">{translate('profile')}</Typography>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon className={classes.icon}>
            <PowerSettingsNewRoundedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">{translate('logout')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
