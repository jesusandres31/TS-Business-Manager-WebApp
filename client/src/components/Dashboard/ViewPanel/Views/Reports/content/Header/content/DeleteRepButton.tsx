import React from 'react';
// components
import { DeleteButton } from '../../../../../common/Table/Header/Buttons';
// children components
import RepDeleteDialog from './Dialogs/RepDeleteDialog';

export default function DeleteRepButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <DeleteButton setOpenDialog={setOpenDialog}>
      <RepDeleteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </DeleteButton>
  );
}
