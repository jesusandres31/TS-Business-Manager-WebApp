import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../app/store';
// global state
import {
  fetchProducts,
  useProductsSelector,
  selectProduct,
} from '../../../../../features/products/productsSlice';
import { fetchProviders } from '../../../../../features/providers/providersSlice';
import { fetchProvidersDetail } from '../../../../../features/providers_detail/providersDetailSlice';
// common
import { Error401 } from '../../../../../common';
// context
import { useView } from '../../../context/ViewContext';
// children components
import MainTable from './content/MainTable';
import MainProvider from '../../MainProvider';

export default function ProductsView() {
  const { error } = useProductsSelector((state) => state.products);

  const { view } = useView();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProviders());
    dispatch(fetchProvidersDetail());
    dispatch(selectProduct(null));
  }, [view, dispatch]);

  if (error) return <Error401 />;

  return (
    <MainProvider>
      <MainTable />
    </MainProvider>
  );
}
