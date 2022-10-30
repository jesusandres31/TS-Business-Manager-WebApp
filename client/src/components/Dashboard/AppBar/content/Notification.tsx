import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
// context
import { useLanguage } from '../../../../context/LanguageContext';

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit">
        <Badge badgeContent={0} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </>
  );
}
