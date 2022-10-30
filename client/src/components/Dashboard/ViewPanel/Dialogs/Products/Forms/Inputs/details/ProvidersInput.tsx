import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { useProvidersSelector } from '../../../../../../../../features/providers/providersSlice';
import {
  useProductFormSelector,
  updateProductForm,
} from '../../../../../../../../features/products/productFormSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useProviderDetail } from '../../../../../../../../hooks/useProviderDetail';

interface ProvidersInputProps {
  index: number;
}

export default function ProvidersInput({ index }: ProvidersInputProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const label = translate('provider');

  const { indexProviderCompanyName } = useProviderDetail();

  const { providers } = useProvidersSelector((state) => state.providers);

  // get available providers
  const enabledProviders = providers.filter(
    (row) =>
      row.enabled &&
      !productForm.provider_details.find(
        (prov_det) => prov_det.provider_id === row.id
      )
  );
  // sorting
  enabledProviders.sort(function (a, b) {
    if (a.company_name > b.company_name) {
      return 1;
    }
    if (a.company_name < b.company_name) {
      return -1;
    }
    return 0;
  });

  const handleDelete = () => {
    // create updated copy
    let newArray = [...productForm.provider_details];
    newArray.splice(index, 1);
    // updating...
    dispatch(
      updateProductForm({
        ...productForm,
        provider_details: newArray,
      })
    );
  };

  const handleInputChange = (
    e: ChangeEvent<{}>,
    providerId: number | null,
    reason: any
  ) => {
    let newValue: number | string | null;
    if (reason === 'clear') {
      newValue = '';
    } else {
      newValue = providerId;
    }
    // create updated copy
    if (newValue !== null) {
      let newArray = [...productForm.provider_details];
      newArray[index] = {
        ...newArray[index],
        provider_id: newValue,
      };
      // updating...
      dispatch(
        updateProductForm({
          ...productForm,
          provider_details: newArray,
        })
      );
    }
    // checking if sanitize form is needed
    if (reason === 'clear') {
      handleDelete();
    }
  };

  return (
    <Autocomplete
      id={`providers_ids${index}`}
      options={enabledProviders.map((row) => {
        return row.id;
      })}
      size="small"
      getOptionLabel={(option) => indexProviderCompanyName(option)}
      getOptionSelected={(option) =>
        providers.map((row) => row.id === option)[0]
      }
      value={
        productForm.provider_details[index].provider_id === ''
          ? null
          : (productForm.provider_details[index].provider_id as number)
      }
      onChange={handleInputChange}
      noOptionsText={translate('noResults')}
      style={{ width: 210 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} required />
      )}
    />
  );
}
