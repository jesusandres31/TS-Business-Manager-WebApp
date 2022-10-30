// global state
import { useProvidersSelector } from '../../../../../../../features/providers/providersSlice';
// components
import { TableFooter } from '../../../../common/Table/Footer';

export default function ProvTableFooter() {
  const { providers } = useProvidersSelector((state) => state.providers);
  const rows = providers.filter((row) => row.enabled);

  return <TableFooter rows={rows} />;
}
