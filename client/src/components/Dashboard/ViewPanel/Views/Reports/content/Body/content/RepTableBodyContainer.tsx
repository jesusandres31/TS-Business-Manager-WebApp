import { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectInvoice,
  useInvoicesSelector,
} from '../../../../../../../../features/invoices/invoicesSlice';
// context
import { useView } from '../../../../../../context/ViewContext';
import { useFilter } from '../../../../../common/context/FilterContext';
import { usePage } from '../../../../../common/context/PageContext';
import { useRowsPerPage } from '../../../../../../context/RowsPerPageContext';
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useExtraTypes } from '../../../../../../../../hooks/useExtraTypes';
import { useClient } from '../../../../../../../../hooks/useClient';
import { useUser } from '../../../../../../../../hooks/useUser';
// interface
import { ReportMaster } from '../../../../../../../../api/invoice.services';
import { Column } from '../RepTableBody';
import { IDate } from '../../../../../../../../interfaces';
// utils
import {
  Order,
  stableSort,
  getComparator,
} from '../../../../../../../../utils/sorting';
// children components
import RepTableContent from './TableContent/RepTableContent';

interface RepTableBodyContainerProps {
  order: Order;
  orderBy: string;
  columns: Column[];
  isCollapse: boolean;
  specificDate: Date | null;
  rangedDate: IDate;
}

export default function RepTableBodyContainer({
  order,
  orderBy,
  columns,
  isCollapse,
  specificDate,
  rangedDate,
}: RepTableBodyContainerProps) {
  const dispatch = useAppDispatch();

  const { view } = useView();

  const { filter, setFilter } = useFilter();

  const { page } = usePage();

  const { rowsPerPage } = useRowsPerPage();

  const { invoices } = useInvoicesSelector((state) => state.invoices);

  const {
    dispatch: { translate },
  } = useLanguage();

  const { indexSaleTypeName, indexPaymentTypeName } = useExtraTypes();

  const { indexUserNameAndSurname } = useUser();

  const { indexClientCompanyName } = useClient();

  const [rows, setRows] = useState<ReportMaster[]>([]);

  useEffect(() => {
    dispatch(selectInvoice(null));
    setFilter('');
  }, [view]);

  useEffect(() => {
    let result = [...invoices];

    if (specificDate) {
      result = result.filter((row) => {
        let rowDate = new Date(row.created);
        if (
          rowDate.getDate() === specificDate.getDate() &&
          rowDate.getMonth() + 1 === specificDate.getMonth() + 1 &&
          rowDate.getFullYear() === specificDate.getFullYear()
        ) {
          return row;
        }
        return null;
      });
    }

    if (rangedDate.dateFrom) {
      let dateFrom = rangedDate.dateFrom as Date;
      result = result.filter((row) => {
        let rowDate = new Date(row.created);
        dateFrom.setHours(0, 0, 0, 0);
        if (dateFrom <= rowDate) {
          return row;
        }
        return null;
      });
    }

    if (rangedDate.dateTo) {
      let dateTo = rangedDate.dateTo as Date;
      result = result.filter((row) => {
        let rowDate = new Date(row.created);
        dateTo.setHours(0, 0, 0, 0);
        if (dateTo >= rowDate) {
          return row;
        }
        return null;
      });
    }

    setRows(result);
  }, [specificDate, rangedDate]);

  // filter function
  let filterRows = {} as ReportMaster[];
  if (filter.length !== 0) {
    filterRows = rows.filter((row) => {
      // formatting date
      let date = new Date(row.created);
      // filtering
      return (
        row.id.toString().toLowerCase().includes(filter.toLowerCase()) ||
        indexUserNameAndSurname(row.user_id)
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        indexClientCompanyName(row.client_id)
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        translate(indexSaleTypeName(row.sale_type_id))
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        translate(indexPaymentTypeName(row.payment_type_id))
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        date
          .toLocaleDateString('en-GB')
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        row.fee_percentage
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        row.total.toString().toLowerCase().includes(filter.toLowerCase())
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
            <RepTableContent
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
