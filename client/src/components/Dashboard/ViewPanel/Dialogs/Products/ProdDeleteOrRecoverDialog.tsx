import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  fetchProducts,
  useProductsSelector,
  selectProduct,
} from '../../../../../features/products/productsSlice';
import {
  disableProduct,
  enableProduct,
} from '../../../../../features/products/productFormSlice';
// context
import { useSnackbar } from '../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../context/LanguageContext';
// hooks
import { useIsRecycleBin } from '../../common/hooks/useIsRecycleBin';
// components
import { DeleteOrRecoverDialog } from '../../common/Dialogs';

interface ProdDeleteOrRecoverDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProdDeleteOrRecoverDialog({
  openDialog,
  setOpenDialog,
}: ProdDeleteOrRecoverDialogProps) {
  const dispatch = useAppDispatch();

  const { isRecycleBin } = useIsRecycleBin();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { product } = useProductsSelector((state) => state.products);

  const [confirMessage, setConfirMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (isRecycleBin) {
      setConfirMessage(translate('recoverProd'));
      setAlertMessage(translate(''));
    } else {
      setConfirMessage(translate('deleteProd'));
      setAlertMessage(translate('youCanRecoverFromBin'));
    }
  }, [openDialog]);

  const {
    dispatch: { setSnackbar, resetSnackbar, errorSnackbar },
  } = useSnackbar();

  const handleDisableProduct = async (
    productId: number,
    productName: string
  ) => {
    dispatch(disableProduct(productId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('product')} "${productName}" ${translate(
            'successDisabled'
          )}`
        );
        dispatch(fetchProducts());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleEnableProduct = async (
    productId: number,
    productName: string
  ) => {
    dispatch(enableProduct(productId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('product')} "${productName}" ${translate(
            'successEnabled'
          )}`
        );
        dispatch(fetchProducts());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleSubmit = () => {
    if (product) {
      resetSnackbar();
      const productId: number = product.id;
      const productName: string = product.name;
      if (isRecycleBin) {
        handleEnableProduct(productId, productName);
      } else {
        handleDisableProduct(productId, productName);
      }
      setOpenDialog(false);
      dispatch(selectProduct(null));
    }
  };

  return (
    <DeleteOrRecoverDialog
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      handleSubmit={handleSubmit}
      confirMessage={confirMessage}
      alertMessage={alertMessage}
    />
  );
}
