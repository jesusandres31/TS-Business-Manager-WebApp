import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
// global state
import { useAppDispatch } from '../../../../../../../../../../app/store';
import {
  useInvoiceDetailSelector,
  fetchInvoiceDetail,
  resetInvoiceDetail,
} from '../../../../../../../../../../features/invoices/invoiceDetailSlice';
// context
import { useCollapsed } from '../../../../../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../../../../context/SnackbarContext';
// interface
import {
  ReportMaster,
  ReportDetail,
} from '../../../../../../../../../../api/invoice.services';
// hooks
import { useProduct } from '../../../../../../../../../../hooks/useProduct';
import { useExtraTypes } from '../../../../../../../../../../hooks/useExtraTypes';
// components
import { CollapseContent } from '../../../../../../../common/Table/Body/content/TableContent/Collapse';
import { LoadingCollapseTable } from '../../../../../../../common/CollapseTable/';
import { ErrorCollapseTable } from '../../../../../../../common/CollapseTable/';

interface CollapseColumn {
  id:
    | 'product_id'
    | 'amount'
    | 'UM'
    | 'units'
    | 'unit_price'
    | 'fee_percentage'
    | 'subtotal';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
}

let collapseColumns: CollapseColumn[] = [
  { id: 'product_id', label: 'product', minWidth: 100, align: 'right' },
  { id: 'units', label: 'units', minWidth: 100, align: 'right' },
  { id: 'amount', label: 'amount', minWidth: 100, align: 'right' },
  {
    id: 'unit_price',
    label: 'unit_price',
    minWidth: 100,
    align: 'right',
  },
  { id: 'UM', label: 'UM', minWidth: 100, align: 'right' },
  {
    id: 'fee_percentage',
    label: 'fee_percentage',
    minWidth: 100,
    align: 'right',
  },
  { id: 'subtotal', label: 'subtotal', minWidth: 100, align: 'right' },
];

interface RepCollapseContentProps {
  row: ReportMaster;
}

export default function RepCollapseContent({ row }: RepCollapseContentProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoiceDetail, loading, error } = useInvoiceDetailSelector(
    (state) => state.invoiceDetail
  );

  const { indexProductName, indexProductTypeId } = useProduct();

  const { indexProductTypeName } = useExtraTypes();

  const { collapsed } = useCollapsed();

  const isCollapsed = (row: any) => collapsed === row.id;
  const isItemCollapsed = isCollapsed(row);

  const loadInvoiceDetail = (invoice: ReportMaster) => {
    const invoiceId: number = invoice.id;
    dispatch(fetchInvoiceDetail(invoiceId))
      .then(unwrapResult)
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  /* const checkIfAmountIsNeeded = () => {
    if (invoiceDetail) {
      const obj = invoiceDetail.find(
        (detail) =>
          typeof detail.amount === 'string' && parseFloat(detail.amount) !== 0
      );
      if (obj) return true;
    }
    return false;
  };

  useEffect(() => {
    if (isItemCollapsed && invoiceDetail.length !== 0) {
      let itisAmountNeeded = checkIfAmountIsNeeded();
      if (!itisAmountNeeded) {
        collapseColumns = collapseColumns.filter((row) => row.id !== 'amount');
      }
    }
  }, [invoiceDetail]); */

  useEffect(() => {
    if (isItemCollapsed) {
      dispatch(resetInvoiceDetail());
      loadInvoiceDetail(row);
    }
  }, [collapsed]);

  if (loading)
    return <LoadingCollapseTable isItemCollapsed={isItemCollapsed} />;

  if (error) return <ErrorCollapseTable isItemCollapsed={isItemCollapsed} />;

  return (
    <CollapseContent isItemCollapsed={isItemCollapsed}>
      {invoiceDetail.length === 0 && loading ? null : (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                {collapseColumns.map((collapseColumn) => (
                  <TableCell
                    key={collapseColumn.id}
                    align={collapseColumn.align}
                  >
                    <Box fontWeight="fontWeightBold">
                      {translate(collapseColumn.label)}
                    </Box>
                    {/* ) : null} */}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {invoiceDetail.map((detail: ReportDetail | any) => (
                <TableRow key={detail.id}>
                  {collapseColumns.map((collapseColumn) => {
                    let value: string | number = detail[collapseColumn.id];

                    // getting product_id name
                    if (
                      collapseColumn.id === 'product_id' &&
                      typeof value === 'number'
                    ) {
                      value = indexProductName(value);
                    }

                    // removing insignificant zeros
                    if (
                      collapseColumn.id === 'units' &&
                      typeof value === 'string'
                    ) {
                      value = parseFloat(value);
                      value = value.toString();
                    }

                    // getting Unity of Measure
                    if (
                      collapseColumn.id === 'UM' &&
                      typeof detail.product_id === 'number'
                    ) {
                      value = translate(
                        indexProductTypeName(
                          indexProductTypeId(detail.product_id) as number
                        )
                      );
                    }

                    // adding Unity of Measure to Amount and replacing 0 by - if 'amount' is 0
                    if (
                      collapseColumn.id === 'amount' &&
                      typeof value === 'string'
                    ) {
                      let productType = indexProductTypeName(
                        indexProductTypeId(detail.product_id) as number
                      );
                      if (productType === 'unit') {
                        value = '-';
                      } else {
                        value = `${value} ${translate(productType)}`;
                      }
                    }

                    // replacing 0 by - if 'units' is 0
                    if (
                      collapseColumn.id === 'units' &&
                      typeof value === 'string'
                    ) {
                      if (parseFloat(value) === 0) {
                        value = '-';
                      }
                    }

                    // adding % to percentage value and remove insignificant zeros
                    if (collapseColumn.id === 'fee_percentage') {
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

                    // adding $ to money value
                    if (
                      (collapseColumn.id === 'subtotal' ||
                        collapseColumn.id === 'unit_price') &&
                      typeof value === 'string'
                    ) {
                      value = `$ ${value}`;
                    }

                    return (
                      <TableCell
                        key={collapseColumn.id}
                        align={collapseColumn.align}
                        style={{
                          minWidth: collapseColumn.minWidth,
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid item xs={12} sm={12}>
            <Box pt={4} />
          </Grid>
        </>
      )}
    </CollapseContent>
  );
}
