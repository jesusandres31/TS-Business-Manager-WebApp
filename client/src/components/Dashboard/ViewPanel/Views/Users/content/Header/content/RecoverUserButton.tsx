import React from 'react';
// components
import { RecoverButton } from '../../../../../common/Table/Header/Buttons';
// children components
import UserDeleteOrRecoverDialog from '../../../../../Dialogs/Users/UserDeleteOrRecoverDialog';

export default function RecoverUserButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <RecoverButton setOpenDialog={setOpenDialog}>
      <UserDeleteOrRecoverDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </RecoverButton>
  );
}
