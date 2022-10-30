import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../app/store';
// global state
import {
  fetchClients,
  useClientsSelector,
  selectClient,
} from '../../../../../features/clients/clientsSlice';
// common
import { Error401 } from '../../../../../common';
// context
import { useView } from '../../../context/ViewContext';
// children components
import MainTable from './content/MainTable';
import MainProvider from '../../MainProvider';

export default function ClientsView() {
  const { error } = useClientsSelector((state) => state.clients);

  const { view } = useView();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(selectClient(null));
  }, [view, dispatch]);

  if (error) return <Error401 />;

  return (
    <MainProvider>
      <MainTable />
    </MainProvider>
  );
}
