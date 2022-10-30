import React, { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { fetchProfile } from '../../../../../../../../features/profile/profileSlice';
import {
  updateGlobalConfigForm,
  useProfileFormSelector,
} from '../../../../../../../../features/profile/profileFormSlice';
// context
import { useSnackbar } from '../../../../../../../../context/SnackbarContext';
// components
import { FormBody, StyledGrid } from '../../../../../common/Forms';
// children components
import CompanyNameInput from './Inputs/CompanyNameInput';
import GlobalLangInput from './Inputs/GlobalLangInput';
import LocalityInput from './Inputs/LocalityInput';
import PhoneInput from './Inputs/PhoneInput';
import EmailInput from './Inputs/EmailInput';
import WebsiteInput from './Inputs/WebsiteInput';

interface GlobalConfigFormBodyProps {
  openDialog: boolean;
}

export default function GlobalConfigFormBody({
  openDialog,
}: GlobalConfigFormBodyProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const handleFetchProfile = () => {
    dispatch(fetchProfile())
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          updateGlobalConfigForm({
            ...globalConfig,
            company_name: payload.company_name,
            language: payload.language,
            locality: payload.locality,
            email: payload.email,
            phone: payload.phone,
            website: payload.website,
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
        <StyledGrid item xs={12} sm={6}>
          <CompanyNameInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <EmailInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <WebsiteInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <PhoneInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <GlobalLangInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <LocalityInput />
        </StyledGrid>
      </>
    </FormBody>
  );
}
