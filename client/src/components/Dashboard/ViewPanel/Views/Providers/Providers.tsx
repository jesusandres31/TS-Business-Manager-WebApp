import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../app/store';
// global state
import {
  fetchProviders,
  useProvidersSelector,
  selectProvider,
} from '../../../../../features/providers/providersSlice';
import { fetchProvidersDetail } from '../../../../../features/providers_detail/providersDetailSlice';
// common
import { Error401 } from '../../../../../common';
// context
import { useView } from '../../../context/ViewContext';
// children components
import MainTable from './content/MainTable';
import MainProvider from '../../MainProvider';

export default function ProvidersView() {
  const { error } = useProvidersSelector((state) => state.providers);

  const { view } = useView();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProviders());
    dispatch(fetchProvidersDetail());
    dispatch(selectProvider(null));
  }, [view, dispatch]);

  if (error) return <Error401 />;

  return (
    <MainProvider>
      <MainTable />
    </MainProvider>
  );
}
