import React, { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Box from '@material-ui/core/Box';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import { useProfileSelector } from '../../../../../../features/profile/profileSlice';
import { useProvidersSelector } from '../../../../../../features/providers/providersSlice';
import {
  fetchProviderById,
  updateProviderForm,
  useProviderFormSelector,
} from '../../../../../../features/providers/providerFormSlice';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
// interface
import { Provider } from '../../../../../../api/provider.services';
// components
import { FormBody, StyledGrid } from '../../../common/Forms';
// children components
import NameInput from './Inputs/NameInput';
import SurnameInput from './Inputs/SurnameInput';
import CompanyNameInput from './Inputs/CompanyNameInput';
import TaxIdInput from './Inputs/TaxIdInput';
import EmailInput from './Inputs/EmailInput';
import PhoneInput from './Inputs/PhoneInput';
import LocalityInput from './Inputs/LocalityInput';
import AddressInput from './Inputs/AddressInput';

interface ProvFormBodyProps {
  openDialog: boolean;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProvFormBody({
  openDialog,
  error,
  setError,
  helperText,
  setHelperText,
}: ProvFormBodyProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const { profile } = useProfileSelector((state) => state.profile);

  const { provider } = useProvidersSelector((state) => state.providers);

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const handleFetchProviderById = (provider: Provider) => {
    const providerId: number = provider.id;
    dispatch(fetchProviderById(providerId))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          updateProviderForm({
            ...provider,
            locality: payload.locality,
            company_name: payload.company_name,
            tax_id: payload.tax_id,
            name: payload.name,
            surname: payload.surname,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
          })
        );
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    if (provider && openDialog) {
      handleFetchProviderById(provider);
    }
    if (!provider && openDialog) {
      dispatch(
        updateProviderForm({
          ...providerForm,
          locality: profile.locality,
        })
      );
    }
  }, [openDialog]);

  return (
    <FormBody>
      <>
        <StyledGrid item xs={12} sm={6}>
          <Box pt={1}>
            <CompanyNameInput
              error={error}
              setError={setError}
              helperText={helperText}
              setHelperText={setHelperText}
            />
          </Box>
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <Box pt={1}>
            <TaxIdInput
              error={error}
              setError={setError}
              helperText={helperText}
              setHelperText={setHelperText}
            />
          </Box>
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <NameInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <SurnameInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <PhoneInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <EmailInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <LocalityInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <AddressInput />
        </StyledGrid>
      </>
    </FormBody>
  );
}
