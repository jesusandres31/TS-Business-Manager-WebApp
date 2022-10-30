import React, { useState } from 'react';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  resetProductForm,
  useProductFormSelector,
} from '../../../../../features/products/productFormSlice';
// children components
import ProdFormBody from './Forms/ProdFormBody';
import ProdFormFooter from './Forms/ProdFormFooter';
import ProdFormHeader from './Forms/ProdFormHeader';
// components
import { CreateOrUpdateDialog } from '../../common/Dialogs';

interface ProdCreateOrUpdateDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProdCreateOrUpdateDialog({
  openDialog,
  setOpenDialog,
}: ProdCreateOrUpdateDialogProps) {
  const dispatch = useAppDispatch();

  const { loading } = useProductFormSelector((state) => state.productForm);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleClose = () => {
    dispatch(resetProductForm());
    setError(false);
    setHelperText('');
    setOpenDialog(false);
  };

  return (
    <>
      <CreateOrUpdateDialog
        openDialog={openDialog}
        handleClose={handleClose}
        loading={loading}
      >
        <ProdFormHeader handleClose={handleClose} />
        <ProdFormBody
          openDialog={openDialog}
          error={error}
          setError={setError}
          helperText={helperText}
          setHelperText={setHelperText}
        />
        <ProdFormFooter
          handleClose={handleClose}
          openDialog={openDialog}
          setError={setError}
          setHelperText={setHelperText}
        />
      </CreateOrUpdateDialog>
    </>
  );
}
