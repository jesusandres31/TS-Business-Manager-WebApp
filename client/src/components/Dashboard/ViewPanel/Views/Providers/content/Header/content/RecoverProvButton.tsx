import React from 'react';
// components
import { RecoverButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProvDeleteOrRecoverDialog from '../../../../../Dialogs/Providers/ProvDeleteOrRecoverDialog';

export default function RecoverProvButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <RecoverButton setOpenDialog={setOpenDialog}>
      <ProvDeleteOrRecoverDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </RecoverButton>
  );
}
