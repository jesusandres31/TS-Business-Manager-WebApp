// global state
import { useProvidersSelector } from '../features/providers/providersSlice';

export const useProvider = () => {
  const { providers } = useProvidersSelector((state) => state.providers);

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

  return {
    indexProviderCompanyName,
  };
};
