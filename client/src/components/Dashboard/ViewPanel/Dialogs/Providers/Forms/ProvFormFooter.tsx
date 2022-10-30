import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import {
  fetchProviders,
  useProvidersSelector,
  selectProvider,
} from '../../../../../../features/providers/providersSlice';
import {
  createProvider,
  updateProvider,
  resetProviderForm,
  useProviderFormSelector,
} from '../../../../../../features/providers/providerFormSlice';
// interface
import {
  Provider,
  ProviderForm,
} from '../../../../../../api/provider.services';
// utils
import { emailVal } from '../../../../../../utils/textFieldVal';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { FormFooter } from '../../../common/Forms';

interface ProvFormFooterProps {
  handleClose: () => void;
  openDialog: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProvFormFooter({
  handleClose,
  openDialog,
  setError,
  setHelperText,
}: ProvFormFooterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const { provider } = useProvidersSelector((state) => state.providers);

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = (providerForm: ProviderForm) => {
    if (
      providerForm.company_name.length >= 2 &&
      !emailVal(providerForm.email)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    validateInput(providerForm);
  }, [providerForm]);

  const handleSubmit = () => {
    if (provider) {
      handleUpdateProvider(provider, providerForm);
    } else {
      handleCreateProvider(providerForm);
    }
  };

  const handleCreateProvider = (providerData: ProviderForm) => {
    const providerName: string = providerData.company_name;
    dispatch(createProvider(providerData))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('provider')} "${providerName}" ${translate(
            'successCreated'
          )}`
        );
        dispatch(resetProviderForm());
        dispatch(fetchProviders());
        dispatch(selectProvider(null));
        handleClose();
      })
      .catch((err) => {
        setError(true);
        setHelperText(err.message);
        errorSnackbar();
        throw err;
      });
  };

  const handleUpdateProvider = (
    selectedProvider: Provider,
    providerData: ProviderForm
  ) => {
    const providerId: number = selectedProvider.id;
    const providerName: string = providerData.company_name;
    dispatch(updateProvider({ providerId, providerData }))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('provider')} "${providerName}" ${translate(
            'successUpdated'
          )}`
        );
        dispatch(resetProviderForm());
        dispatch(fetchProviders());
        dispatch(selectProvider(null));
      })
      .catch((err) => {
        setError(true);
        setHelperText(err.message);
        errorSnackbar();
        throw err;
      });
  };

  return (
    <FormFooter
      handleSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
      openDialog={openDialog}
      isUpdate={provider ? true : false}
    />
  );
}
