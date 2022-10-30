// global state
import { useProductTypesSelector } from '../features/extras/productTypesSlice';
import { usePaymentTypesSelector } from '../features/extras/paymentTypesSlice';
import { useSaleTypesSelector } from '../features/extras/saleTypesSlice';
import { useLanguagesSelector } from '../features/extras/languagesSlice';

export const useExtraTypes = () => {
  const { productTypes } = useProductTypesSelector(
    (state) => state.productTypes
  );

  const { paymentTypes } = usePaymentTypesSelector(
    (state) => state.paymentTypes
  );

  const { saleTypes } = useSaleTypesSelector((state) => state.saleTypes);

  const { languages } = useLanguagesSelector((state) => state.languages);

  /**
   * index product type name
   */
  const indexProductTypeName = (value: number) => {
    if (productTypes) {
      const obj = productTypes.find((type) => type.id === value)!;
      if (obj) return obj.name;
    }
    return '';
  };

  /**
   * index payment type name
   */
  const indexPaymentTypeName = (value: number) => {
    if (paymentTypes) {
      const obj = paymentTypes.find((type) => type.id === value)!;
      if (obj) return obj.name;
    }
    return '';
  };

  /**
   * index sale type name
   */
  const indexSaleTypeName = (value: number) => {
    if (saleTypes) {
      const obj = saleTypes.find((type) => type.id === value)!;
      if (obj) return obj.name;
    }
    return '';
  };

  /**
   * index language name
   */
  const indexLanguageName = (value: string) => {
    if (languages) {
      const obj = languages.find((lang) => lang.id === value)!;
      if (obj) return obj.name;
    }
    return '';
  };

  return {
    indexProductTypeName,
    indexPaymentTypeName,
    indexSaleTypeName,
    indexLanguageName,
  };
};
