import React from 'react';
import Typography from '@material-ui/core/Typography';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// components
import { MenuButton } from '../../../../../common/Table/Header/Buttons';
// child components
import UserResetPsswdDialog from '../../../../../Dialogs/Users/UserResetPsswdDialog';

export default function MenuUserButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <MenuButton setOpenDialog={setOpenDialog}>
      <LockRoundedIcon fontSize="small" />

      <Typography variant="inherit">
        {translate('resetUserPassword')}
      </Typography>

      <UserResetPsswdDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </MenuButton>
  );
}
