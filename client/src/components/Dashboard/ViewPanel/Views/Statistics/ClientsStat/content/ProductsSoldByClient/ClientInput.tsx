import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// global state
import { useClientsSelector } from '../../../../../../../../features/clients/clientsSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useClient } from '../../../../../../../../hooks/useClient';
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';

interface ClientInputProps {
  clientId: number | null;
  setClientId: React.Dispatch<React.SetStateAction<number | null>>;
}
export default function ClientInput({
  clientId,
  setClientId,
}: ClientInputProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

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
    let newValue: number | null;
    if (reason === 'clear') {
      newValue = null;
    } else {
      newValue = clientId as number;
    }
    setClientId(newValue);
  };

  return (
    <Autocomplete
      id="client-invoice"
      size="small"
      options={enabledClients.map((row) => {
        return row.id;
      })}
      getOptionLabel={(option) => indexClientCompanyName(option)}
      getOptionSelected={(option) => clients.map((row) => row.id === option)[0]}
      value={clientId}
      onChange={handleInputChange}
      noOptionsText={translate('noResults')}
      style={{ width: isMobile ? 240 : 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} required />
      )}
    />
  );
}
