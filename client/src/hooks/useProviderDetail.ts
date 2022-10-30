// global state
import { useProductsSelector } from '../features/products/productsSlice';
import { useProvidersSelector } from '../features/providers/providersSlice';
import { useProvidersDetailSelector } from '../features/providers_detail/providersDetailSlice';
// interfaces
import { Product } from '../api/product.services';
import { Provider } from '../api/provider.services';
import { ProviderDetail } from '../api/providerDetail.services';

export const useProviderDetail = () => {
  const { products } = useProductsSelector((state) => state.products);

  const { providers } = useProvidersSelector((state) => state.providers);

  const { providersDetail } = useProvidersDetailSelector(
    (state) => state.providersDetail
  );

  /**
   * index provider company name
   */
  const indexProviderCompanyName = (id: number) => {
    if (providers) {
      const obj = providers.find((provider) => provider.id === id)!;
      if (obj) return obj.company_name;
    }
    return '';
  };

  /**
   * get product providers
   */
  const getProductProviders = (productId: number) => {
    if (providersDetail && providers) {
      let providersIds: any[] = [];
      providersDetail.forEach((row) => {
        if (row.product_id === productId) {
          providersIds.push(row.provider_id);
        }
      });

      let productProviders: Provider[] = [];
      providersIds.forEach((id) => {
        const prov = providers.find((provider) => provider.id === id)!;
        productProviders.push(prov);
      });

      if (productProviders) return productProviders;
    }
    return [];
  };

  /**
   * get provider products
   */
  const getProviderProducts = (providerId: number) => {
    if (providersDetail && products) {
      let productsIds: any[] = [];
      providersDetail.forEach((row) => {
        if (row.provider_id === providerId) {
          productsIds.push(row.product_id);
        }
      });

      let providerProducts: Product[] = [];
      productsIds.forEach((id) => {
        const prod = products.find((product) => product.id === id)!;
        providerProducts.push(prod);
      });

      if (providerProducts) return providerProducts;
    }
    return [];
  };

  /**
   * get product provider details
   */
  const getProductProviderDetails = (productId: number) => {
    if (providersDetail && providers) {
      let providerDetails: ProviderDetail[] = [];
      providersDetail.forEach((row) => {
        if (row.product_id === productId) {
          providerDetails.push(row);
        }
      });

      if (providerDetails) return providerDetails;
    }
    return [];
  };

  return {
    indexProviderCompanyName,
    getProductProviders,
    getProviderProducts,
    getProductProviderDetails,
  };
};
