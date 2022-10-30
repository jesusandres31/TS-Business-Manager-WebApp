// global state
import { useProductsSelector } from '../features/products/productsSlice';
import { useProductTypesSelector } from '../features/extras/productTypesSlice';

export const useProduct = () => {
  const { products } = useProductsSelector((state) => state.products);

  const { productTypes } = useProductTypesSelector(
    (state) => state.productTypes
  );

  /**
   * index product name
   */
  const indexProductName = (id: number) => {
    if (products) {
      const obj = products.find((product) => product.id === id)!;
      if (obj) return obj.name;
    }
    return '';
  };

  /**
   * index product type id
   */
  const indexProductTypeId = (id: number) => {
    if (products) {
      const obj = products.find((product) => product.id === id)!;
      if (obj) return obj.product_type_id;
    }
    return '';
  };

  /**
   * index product sale price
   */
  const indexProductSalePrice = (id: number) => {
    if (products) {
      const obj = products.find((product) => product.id === id)!;
      if (obj) return obj.sale_price;
    }
    return '';
  };

  return {
    indexProductName,
    indexProductTypeId,
    indexProductSalePrice,
  };
};
