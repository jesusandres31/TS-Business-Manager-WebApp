import React from 'react';
// components
import { EditButton } from '../../../../../common/Table/Header/Buttons';
// children components
import InvCreateOrUpdateDialog from '../../../../../Dialogs/Reports/InvCreateOrUpdateDialog';

export default function EditRepButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <EditButton setOpenDialog={setOpenDialog}>
      <InvCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </EditButton>
  );
}
