// global state
import { useClientsSelector } from '../../../../../../../features/clients/clientsSlice';
// components
import { TableFooter } from '../../../../common/Table/Footer';

export default function CliTableFooter() {
  const { clients } = useClientsSelector((state) => state.clients);
  const rows = clients.filter((row) => row.enabled);

  return <TableFooter rows={rows} />;
}
