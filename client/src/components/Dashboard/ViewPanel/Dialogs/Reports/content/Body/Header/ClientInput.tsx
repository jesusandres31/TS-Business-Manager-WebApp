import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { useClientsSelector } from '../../../../../../../../features/clients/clientsSlice';
import {
  useInvoiceFormSelector,
  updateInvoiceForm,
} from '../../../../../../../../features/invoices/invoiceFormSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useClient } from '../../../../../../../../hooks/useClient';
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';

export default function ClientInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { clients } = useClientsSelector((state) => state.clients);

  const { indexClientCompanyName } = useClient();

  const { isMobile } = useIsMobile();

  const label = translate('client');

  // get enabled clients
  const enabledClients = clients.filter((row) => row.enabled);
  // sorting
  enabledClients.sort(function (a, b) {
    if (a.company_name > b.company_name) {
      return 1;
    }
    if (a.company_name < b.company_name) {
      return -1;
    }
    return 0;
  });

  const handleInputChange = (
    e: ChangeEvent<{}>,
    clientId: number | null,
    reason: any
  ) => {
    let newValue: number | string;
    if (reason === 'clear') {
      newValue = '';
    } else {
      newValue = clientId as number;
    }
    dispatch(
      updateInvoiceForm({
        ...invoiceForm,
        client_id: newValue,
      })
    );
  };

  return (
    <Autocomplete
      id="inv-cli"
      size="small"
      options={enabledClients.map((row) => {
        return row.id;
      })}
      getOptionLabel={(option) => indexClientCompanyName(option)}
      getOptionSelected={(option) => clients.map((row) => row.id === option)[0]}
      value={
        invoiceForm.client_id === '' ? null : (invoiceForm.client_id as number)
      }
      onChange={handleInputChange}
      noOptionsText={translate('noResults')}
      style={{ width: isMobile ? 240 : 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} required />
      )}
    />
  );
}
