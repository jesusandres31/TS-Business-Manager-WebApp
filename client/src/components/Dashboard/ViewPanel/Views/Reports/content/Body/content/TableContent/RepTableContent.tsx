import React from 'react';
// global context
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  selectInvoice,
  useInvoicesSelector,
} from '../../../../../../../../../features/invoices/invoicesSlice';
// hooks
import { useExtraTypes } from '../../../../../../../../../hooks/useExtraTypes';
import { useClient } from '../../../../../../../../../hooks/useClient';
import { useUser } from '../../../../../../../../../hooks/useUser';
import { useIsRecycleBin } from '../../../../../../common/hooks/useIsRecycleBin';
// interface
import { Column } from '../../RepTableBody';
import { ReportMaster } from '../../../../../../../../../api/invoice.services';
// context
import { useCollapsed } from '../../../../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// components
import {
  StyledTableCell,
  TableContent,
} from '../../../../../../common/Table/Body/content/TableContent';
import RepCollapseContent from './Collapse/RepCollapseContent';

interface RepTableContentProps {
  row: ReportMaster;
  labelId: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function RepTableContent({
  row,
  labelId,
  columns,
  isCollapse,
}: RepTableContentProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoice } = useInvoicesSelector((state) => state.invoices);

  const { collapsed, setCollapsed } = useCollapsed();

  const { indexSaleTypeName, indexPaymentTypeName } = useExtraTypes();

  const { indexUserNameAndSurname } = useUser();

  const { indexClientCompanyName } = useClient();

  const { isRecycleBin } = useIsRecycleBin();

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    let newSelected: ReportMaster | null = null;
    if (invoice === row) {
      // close collapse
      setCollapsed('');
    } else {
      newSelected = row;
      // close collapse
      if (collapsed !== row.id) {
        setCollapsed('');
      }
    }
    dispatch(selectInvoice(newSelected));
  };

  const fixCollapse = () => {
    setCollapsed(row.id);
    // deselect item if needed
    if (invoice) {
      if (invoice.id !== row.id) {
        dispatch(selectInvoice(null));
      }
    }
  };

  return (
    <>
      <TableContent
        row={row}
        labelId={labelId}
        isCollapse={isCollapse}
        selectedItem={invoice}
        handleClick={handleClick}
        fixCollapse={fixCollapse}
      >
        {columns.map((column) => {
          let value = row[column.id];

          // getting name of user_id
          if (column.id === 'user_id' && typeof value === 'number') {
            value = indexUserNameAndSurname(value);
          }

          // getting name of client_id
          if (column.id === 'client_id' && typeof value === 'number') {
            value = indexClientCompanyName(value);
          }

          // getting name of sale_type_id
          if (column.id === 'sale_type_id' && typeof value === 'number') {
            value = translate(indexSaleTypeName(value));
          }

          // getting name of payment_type_id
          if (column.id === 'payment_type_id' && typeof value === 'number') {
            value = translate(indexPaymentTypeName(value));
          }

          // formatting date
          if (column.id === 'created' && typeof value === 'string') {
            var dateObject = new Date(value);
            value = dateObject.toLocaleDateString('en-GB');
          }

          // adding $ to money value
          if (column.id === 'total' && typeof value === 'string') {
            value = `$ ${value}`;
          }

          // adding % to percentage value and remove insignificant zeros
          if (column.id === 'fee_percentage') {
            value = value.toString();
            value = parseFloat(value);
            if (value === 0) {
              value = '-';
            } else if (value < 0) {
              value = `${value} %`;
            } else {
              value = `+${value} %`;
            }
          }

          return (
            <StyledTableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.format && typeof value === 'number'
                ? column.format(value)
                : value}
            </StyledTableCell>
          );
        })}
      </TableContent>

      {isRecycleBin ? null : <RepCollapseContent row={row} />}
    </>
  );
}
