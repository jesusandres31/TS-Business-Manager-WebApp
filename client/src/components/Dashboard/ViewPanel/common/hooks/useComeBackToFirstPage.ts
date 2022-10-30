// context
import { usePage } from '../context/PageContext';

export const useComeBackToFirstPage = () => {
  const { page, setPage } = usePage();

  const comeBackToFirstPage = () => {
    if (page !== 0) {
      setPage(0);
    }
  };

  return { comeBackToFirstPage };
};
