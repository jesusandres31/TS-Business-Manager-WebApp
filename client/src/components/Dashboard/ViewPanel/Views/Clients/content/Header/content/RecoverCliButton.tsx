import React from 'react';
// components
import { RecoverButton } from '../../../../../common/Table/Header/Buttons';
// children components
import CliDeleteOrRecoverDialog from '../../../../../Dialogs/Clients/CliDeleteOrRecoverDialog';

export default function RecoverCliButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <RecoverButton setOpenDialog={setOpenDialog}>
      <CliDeleteOrRecoverDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </RecoverButton>
  );
}
