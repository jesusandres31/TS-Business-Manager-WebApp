import React from 'react';
// components
import { AddButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProvCreateOrUpdateDialog from '../../../../../Dialogs/Providers/ProvCreateOrUpdateDialog';

export default function AddProvButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <AddButton setOpenDialog={setOpenDialog}>
      <ProvCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </AddButton>
  );
}
