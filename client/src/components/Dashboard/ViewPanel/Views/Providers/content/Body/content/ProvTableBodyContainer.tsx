import { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectProvider,
  useProvidersSelector,
} from '../../../../../../../../features/providers/providersSlice';
// context
import { useView } from '../../../../../../context/ViewContext';
import { useFilter } from '../../../../../common/context/FilterContext';
import { usePage } from '../../../../../common/context/PageContext';
import { useRowsPerPage } from '../../../../../../context/RowsPerPageContext';
// hooks
import { useIsRecycleBin } from '../../../../../common/hooks/useIsRecycleBin';
// interface
import { Provider } from '../../../../../../../../api/provider.services';
import { Column } from '../ProvTableBody';
// utils
import {
  Order,
  stableSort,
  getComparator,
} from '../../../../../../../../utils/sorting';
// children components
import ProvTableContent from './TableContent/ProvTableContent';

interface ProvTableBodyContainerProps {
  order: Order;
  orderBy: keyof Provider;
  columns: Column[];
  isCollapse: boolean;
}

export default function ProvTableBodyContainer({
  order,
  orderBy,
  columns,
  isCollapse,
}: ProvTableBodyContainerProps) {
  const dispatch = useAppDispatch();

  const { view } = useView();

  const { filter, setFilter } = useFilter();

  const { isRecycleBin } = useIsRecycleBin();

  const { page } = usePage();

  const { rowsPerPage } = useRowsPerPage();

  const { providers } = useProvidersSelector((state) => state.providers);

  const [rows, setRows] = useState<Provider[]>([]);

  // getting enabled or disabled rows
  useEffect(() => {
    if (isRecycleBin) {
      const disabledProviders = providers.filter((row) => !row.enabled);
      setRows(disabledProviders);
    } else {
      const enabledProviders = providers.filter((row) => row.enabled);
      setRows(enabledProviders);
    }
    dispatch(selectProvider(null));
    setFilter('');
  }, [view]);

  // filter function
  let filterRows = {} as Provider[];
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
            <ProvTableContent
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
