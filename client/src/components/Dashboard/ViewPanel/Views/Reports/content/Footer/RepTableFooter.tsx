// global state
import { useInvoicesSelector } from '../../../../../../../features/invoices/invoicesSlice';
// components
import { TableFooter } from '../../../../common/Table/Footer';

export default function RepTableFooter() {
  const { invoices } = useInvoicesSelector((state) => state.invoices);
  const rows = invoices;

  return <TableFooter rows={rows} />;
}
