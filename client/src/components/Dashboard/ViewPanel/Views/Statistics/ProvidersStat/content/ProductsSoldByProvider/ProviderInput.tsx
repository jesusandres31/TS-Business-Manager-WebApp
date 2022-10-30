import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// global state
import { useProvidersSelector } from '../../../../../../../../features/providers/providersSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useProvider } from '../../../../../../../../hooks/useProvider';
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';

interface ProviderInputProps {
  providerId: number | null;
  setProviderId: React.Dispatch<React.SetStateAction<number | null>>;
}
export default function ProviderInput({
  providerId,
  setProviderId,
}: ProviderInputProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { providers } = useProvidersSelector((state) => state.providers);

  const { indexProviderCompanyName } = useProvider();

  const { isMobile } = useIsMobile();

  const label = translate('provider');

  // get enabled providers
  const enabledProviders = providers.filter((row) => row.enabled);
  // sorting
  enabledProviders.sort(function (a, b) {
    if (a.company_name > b.company_name) {
      return 1;
    }
    if (a.company_name < b.name) {
      return -1;
    }
    return 0;
  });

  const handleInputChange = (
    e: ChangeEvent<{}>,
    providerId: number | null,
    reason: any
  ) => {
    let newValue: number | null;
    if (reason === 'clear') {
      newValue = null;
    } else {
      newValue = providerId as number;
    }
    setProviderId(newValue);
  };

  return (
    <Autocomplete
      id="provider-invoice"
      size="small"
      options={enabledProviders.map((row) => {
        return row.id;
      })}
      getOptionLabel={(option) => indexProviderCompanyName(option)}
      getOptionSelected={(option) =>
        providers.map((row) => row.id === option)[0]
      }
      value={providerId}
      onChange={handleInputChange}
      noOptionsText={translate('noResults')}
      style={{ width: isMobile ? 240 : 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} required />
      )}
    />
  );
}
