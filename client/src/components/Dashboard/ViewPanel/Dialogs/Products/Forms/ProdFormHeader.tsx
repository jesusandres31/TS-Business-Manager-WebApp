// global state
import { useProductsSelector } from '../../../../../../features/products/productsSlice';
// context
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { FormHeader } from '../../../common/Forms';

interface ProdFormHeaderProps {
  handleClose: () => void;
}

export default function ProdFormHeader({ handleClose }: ProdFormHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { product } = useProductsSelector((state) => state.products);

  return (
    <FormHeader handleClose={handleClose}>
      {product
        ? `${translate('update')} ${translate('_product')} 📦✏️`
        : `${translate('create')} ${translate('_product')} 📦✔️`}
    </FormHeader>
  );
}
