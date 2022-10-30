import React from 'react';
// components
import { EditButton } from '../../../../../common/Table/Header/Buttons';
// children components
import UserCreateOrUpdateDialog from '../../../../../Dialogs/Users/UserCreateOrUpdateDialog';

export default function EditUserButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <EditButton setOpenDialog={setOpenDialog}>
      <UserCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </EditButton>
  );
}
