import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import {
  fetchClients,
  useClientsSelector,
  selectClient,
} from '../../../../../../features/clients/clientsSlice';
import {
  createClient,
  updateClient,
  resetClientForm,
  useClientFormSelector,
} from '../../../../../../features/clients/clientFormSlice';
import {
  useInvoiceFormSelector,
  updateInvoiceForm,
} from '../../../../../../features/invoices/invoiceFormSlice';
// interface
import { Client, ClientForm } from '../../../../../../api/client.services';
// utils
import { emailVal } from '../../../../../../utils/textFieldVal';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
import { useCollapsed } from '../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../context/LanguageContext';
import { useView, View } from '../../../../context/ViewContext';
// components
import { FormFooter } from '../../../common/Forms';

interface CliFormFooterProps {
  handleClose: () => void;
  openDialog: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function CliFormFooter({
  handleClose,
  openDialog,
  setError,
  setHelperText,
}: CliFormFooterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const { view } = useView();

  const { clients, client } = useClientsSelector((state) => state.clients);

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { clientForm } = useClientFormSelector((state) => state.clientForm);

  const { setCollapsed } = useCollapsed();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = (client: ClientForm) => {
    if (client.company_name.length >= 2 && !emailVal(client.email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    validateInput(clientForm);
  }, [clientForm]);

  /* const handleAddClientIfNeeded = (clientName: string) => {
    if (view === ('REPORTS' as View)) {
      let addedClient: Client | undefined = clients.find(
        (row) => row.company_name === clientName
      );
      if (addedClient) {
        dispatch(
          updateInvoiceForm({
            ...invoiceForm,
            client_id: addedClient.id,
          })
        );
      }
    }
  }; */

  /* const handleFetchClients = async () => {
    dispatch(fetchClients());
  }; */

  const handleSubmit = () => {
    if (client) {
      handleUpdateClient(client, clientForm);
    } else {
      handleCreateClient(clientForm);
    }
  };

  const handleCreateClient = (clientData: ClientForm) => {
    const clientName: string = clientData.company_name;
    dispatch(createClient(clientData))
      .then(unwrapResult)
      .then(async () => {
        setSnackbar(
          true,
          `${translate('client')} "${clientName}" ${translate(
            'successCreated'
          )}`
        );
        dispatch(resetClientForm());
        dispatch(fetchClients());
        dispatch(selectClient(null));
        setCollapsed('');
        handleClose();
        /* await handleFetchClients().then(() => {
          handleAddClientIfNeeded(clientName);
        }); */
      })
      .catch((err) => {
        setError(true);
        setHelperText(err.message);
        errorSnackbar();
        throw err;
      });
  };

  const handleUpdateClient = (
    selectedClient: Client,
    clientData: ClientForm
  ) => {
    const clientId: number = selectedClient.id;
    const clientName: string = clientData.company_name;
    dispatch(updateClient({ clientId, clientData }))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('client')} "${clientName}" ${translate(
            'successUpdated'
          )}`
        );
        dispatch(resetClientForm());
        dispatch(fetchClients());
        dispatch(selectClient(null));
        setCollapsed('');
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
      isUpdate={client ? true : false}
    />
  );
}
