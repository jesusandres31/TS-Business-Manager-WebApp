// global state
import { useClientsSelector } from '../features/clients/clientsSlice';

export const useClient = () => {
  const { clients } = useClientsSelector((state) => state.clients);

  /**
   * index client company name
   */
  const indexClientCompanyName = (id: number) => {
    if (clients) {
      const obj = clients.find((client) => client.id === id)!;
      if (obj) return obj.company_name;
    }
    return '';
  };

  return {
    indexClientCompanyName,
  };
};
