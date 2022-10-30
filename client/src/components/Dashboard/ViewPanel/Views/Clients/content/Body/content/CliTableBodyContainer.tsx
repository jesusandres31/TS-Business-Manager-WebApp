import { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
// global context
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectClient,
  useClientsSelector,
} from '../../../../../../../../features/clients/clientsSlice';
// context
import { useView } from '../../../../../../context/ViewContext';
import { useFilter } from '../../../../../common/context/FilterContext';
import { usePage } from '../../../../../common/context/PageContext';
import { useRowsPerPage } from '../../../../../../context/RowsPerPageContext';
// hooks
import { useIsRecycleBin } from '../../../../../common/hooks/useIsRecycleBin';
// interface
import { Client } from '../../../../../../../../api/client.services';
import { Column } from '../CliTableBody';
// utils
import {
  Order,
  stableSort,
  getComparator,
} from '../../../../../../../../utils/sorting';
// children components
import CliTableContent from './TableContent/CliTableContent';

interface CliTableBodyContainerProps {
  order: Order;
  orderBy: keyof Client;
  columns: Column[];
  isCollapse: boolean;
  showCliWithDebts: boolean;
}

export default function CliTableBodyContainer({
  order,
  orderBy,
  columns,
  isCollapse,
  showCliWithDebts,
}: CliTableBodyContainerProps) {
  const dispatch = useAppDispatch();

  const { view } = useView();

  const { filter, setFilter } = useFilter();

  const { isRecycleBin } = useIsRecycleBin();

  const { page } = usePage();

  const { rowsPerPage } = useRowsPerPage();

  const { clients } = useClientsSelector((state) => state.clients);

  const [rows, setRows] = useState<Client[]>([]);

  // getting enabled or disabled rows
  useEffect(() => {
    if (isRecycleBin) {
      const disabledClients = clients.filter((row) => !row.enabled);
      setRows(disabledClients);
    } else {
      if (showCliWithDebts) {
        const debtorsClients = clients.filter(
          (row) => parseFloat(row.debt) !== 0
        );
        setRows(debtorsClients);
      } else {
        const enabledClients = clients.filter((row) => row.enabled);
        setRows(enabledClients);
      }
    }
    dispatch(selectClient(null));
    setFilter('');
  }, [view, showCliWithDebts]);

  // filter function
  let filterRows = {} as Client[];
  if (filter.length !== 0) {
    filterRows = rows.filter((row) => {
      return (
        row.company_name
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        row.tax_id.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.email.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.phone.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.address.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.locality.toString().toLowerCase().includes(filter.toLowerCase())
      );
    });
  }

  return (
    <TableBody>
      {stableSort(filter ? filterRows : rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const labelId = `table-row-${index}`;

          return (
            <CliTableContent
              row={row}
              labelId={labelId}
              key={labelId}
              columns={columns}
              isCollapse={isCollapse}
            />
          );
        })}
    </TableBody>
  );
}
