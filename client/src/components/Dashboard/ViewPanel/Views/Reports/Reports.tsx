import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../app/store';
// global state
import {
  fetchInvoices,
  useInvoicesSelector,
  selectInvoice,
} from '../../../../../features/invoices/invoicesSlice';
import { fetchClients } from '../../../../../features/clients/clientsSlice';
import { fetchProducts } from '../../../../../features/products/productsSlice';
import { fetchUsers } from '../../../../../features/users/usersSlice';
// common
import { Error401 } from '../../../../../common';
// context
import { useView } from '../../../context/ViewContext';
// children components
import MainTable from './content/MainTable';
import MainProvider from '../../MainProvider';

export default function ReportsView() {
  const { error } = useInvoicesSelector((state) => state.invoices);

  const { view } = useView();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(fetchClients());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
    dispatch(selectInvoice(null));
  }, [view, dispatch]);

  if (error) return <Error401 />;

  return (
    <MainProvider>
      <MainTable />
    </MainProvider>
  );
}
