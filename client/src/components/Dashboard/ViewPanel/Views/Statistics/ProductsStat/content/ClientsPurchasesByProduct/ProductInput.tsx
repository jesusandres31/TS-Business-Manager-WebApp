import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// global state
import { useProductsSelector } from '../../../../../../../../features/products/productsSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useProduct } from '../../../../../../../../hooks/useProduct';
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';

interface ProductInputProps {
  productId: number | null;
  setProductId: React.Dispatch<React.SetStateAction<number | null>>;
}
export default function ProductInput({
  productId,
  setProductId,
}: ProductInputProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { products } = useProductsSelector((state) => state.products);

  const { indexProductName } = useProduct();

  const { isMobile } = useIsMobile();

  const label = translate('product');

  // get enabled products
  const enabledProducts = products.filter((row) => row.enabled);
  // sorting
  enabledProducts.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const handleInputChange = (
    e: ChangeEvent<{}>,
    productId: number | null,
    reason: any
  ) => {
    let newValue: number | null;
    if (reason === 'clear') {
      newValue = null;
    } else {
      newValue = productId as number;
    }
    setProductId(newValue);
  };

  return (
    <Autocomplete
      id="product-invoice"
      size="small"
      options={enabledProducts.map((row) => {
        return row.id;
      })}
      getOptionLabel={(option) => indexProductName(option)}
      getOptionSelected={(option) =>
        products.map((row) => row.id === option)[0]
      }
      value={productId}
      onChange={handleInputChange}
      noOptionsText={translate('noResults')}
      style={{ width: isMobile ? 240 : 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} required />
      )}
    />
  );
}
