import React from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  useProfileFormSelector,
  resetProfileForm,
} from '../../../../../../../features/profile/profileFormSlice';
// children components
import GlobalConfigFormBody from './Forms/GlobalConfigFormBody';
import GlobalConfigFormFooter from './Forms/GlobalConfigFormFooter';
import GlobalConfigFormHeader from './Forms/GlobalConfigFormHeader';
// components
import { CreateOrUpdateDialog } from '../../../../common/Dialogs';

interface GlobalConfigDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GlobalConfigDialog({
  openDialog,
  setOpenDialog,
}: GlobalConfigDialogProps) {
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
        <GlobalConfigFormHeader handleClose={handleClose} />
        <GlobalConfigFormBody openDialog={openDialog} />
        <GlobalConfigFormFooter
          handleClose={handleClose}
          openDialog={openDialog}
        />
      </CreateOrUpdateDialog>
    </>
  );
}
