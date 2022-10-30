import React from 'react';
// components
import { RecoverButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProdDeleteOrRecoverDialog from '../../../../../Dialogs/Products/ProdDeleteOrRecoverDialog';

export default function RecoverProdButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <RecoverButton setOpenDialog={setOpenDialog}>
      <ProdDeleteOrRecoverDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </RecoverButton>
  );
}
