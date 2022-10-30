import React from 'react';
// components
import { AddButton } from '../../../../../common/Table/Header/Buttons';
// children components
import InvCreateOrUpdateDialog from '../../../../../Dialogs/Reports/InvCreateOrUpdateDialog';

export default function AddRepButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <AddButton setOpenDialog={setOpenDialog}>
      <InvCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </AddButton>
  );
}
