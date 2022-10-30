import React, { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { fetchProfile } from '../../../../../../../../features/profile/profileSlice';
import {
  updateValueConfigForm,
  useProfileFormSelector,
} from '../../../../../../../../features/profile/profileFormSlice';
// context
import { useSnackbar } from '../../../../../../../../context/SnackbarContext';
// components
import { FormBody, StyledGrid } from '../../../../../common/Forms';
// children components
import ProductTypeInput from './Inputs/ProductTypeInput';
import PaymentTypeInput from './Inputs/PaymentTypeInput';
import SaleTypeInput from './Inputs/SaleTypeInput';

interface ValueConfigFormBodyProps {
  openDialog: boolean;
}

export default function ValueConfigFormBody({
  openDialog,
}: ValueConfigFormBodyProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const { valueConfig } = useProfileFormSelector((state) => state.profileForm);

  const handleFetchProfile = () => {
    dispatch(fetchProfile())
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          updateValueConfigForm({
            ...valueConfig,
            product_type_id: payload.product_type_id,
            payment_type_id: payload.payment_type_id,
            sale_type_id: payload.sale_type_id,
          })
        );
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    handleFetchProfile();
  }, [openDialog]);

  return (
    <FormBody>
      <>
        <StyledGrid item xs={12} sm={12}>
          <PaymentTypeInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={12}>
          <ProductTypeInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={12}>
          <SaleTypeInput />
        </StyledGrid>
      </>
    </FormBody>
  );
}
