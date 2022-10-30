import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      minWidth: '40px',
    },
  })
);

interface MenuButtonProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element[];
}

export default function MenuButton({
  setOpenDialog,
  children,
}: MenuButtonProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { isMobile } = useIsMobile();

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpenDialog!(true);
    handleClose();
  };

  return (
    <>
      <Tooltip title={translate('moreOptions')}>
        <IconButton
          aria-label="moreoptions"
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleMenu}
          size={isMobile ? 'small' : 'medium'}
        >
          <MoreVertRoundedIcon />
        </IconButton>
      </Tooltip>

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
        <MenuItem onClick={handleClick}>
          <ListItemIcon className={classes.icon}>{children[0]}</ListItemIcon>
          {children[1]}
        </MenuItem>
        {children[2]}
      </Menu>
    </>
  );
}
