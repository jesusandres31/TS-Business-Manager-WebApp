import React from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  useProfileFormSelector,
  resetProfileForm,
} from '../../../../../../../features/profile/profileFormSlice';
// children components
import ValueConfigFormBody from './Forms/ValueConfigFormBody';
import ValueConfigFormFooter from './Forms/ValueConfigFormFooter';
import ValueConfigFormHeader from './Forms/ValueConfigFormHeader';
// components
import { CreateOrUpdateDialog } from '../../../../common/Dialogs';

interface ValueConfigDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ValueConfigDialog({
  openDialog,
  setOpenDialog,
}: ValueConfigDialogProps) {
  const dispatch = useAppDispatch();

  const { loading } = useProfileFormSelector((state) => state.profileForm);

  const handleClose = () => {
    dispatch(resetProfileForm());
    setOpenDialog(false);
  };

  return (
    <>
      <CreateOrUpdateDialog
        openDialog={openDialog}
        handleClose={handleClose}
        loading={loading}
      >
        <ValueConfigFormHeader handleClose={handleClose} />
        <ValueConfigFormBody openDialog={openDialog} />
        <ValueConfigFormFooter
          handleClose={handleClose}
          openDialog={openDialog}
        />
      </CreateOrUpdateDialog>
    </>
  );
}
