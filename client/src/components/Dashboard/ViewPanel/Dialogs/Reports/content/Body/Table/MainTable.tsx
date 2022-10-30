import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// global state
import { useInvoiceFormSelector } from '../../../../../../../../features/invoices/invoiceFormSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// interface
import { ReportDetailForm } from '../../../../../../../../api/invoice.services';
// hooks
import { useProduct } from '../../../../../../../../hooks/useProduct';
import { useExtraTypes } from '../../../../../../../../hooks/useExtraTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: 940,
    },
    paper: {
      height: 270,
      maxWidth: 940,
      minWidth: 100,
    },
    container: {
      height: 270,
      maxWidth: 940,
      // minWidth: 100,
    },
    row: {
      height: '6.5vh',
    },
  })
);

export interface Column {
  id:
    | 'product_id'
    | 'amount'
    | 'units'
    | 'unit_price'
    | 'fee_percentage'
    | 'subtotal';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'left';
}

const columns: Column[] = [
  {
    id: 'product_id',
    label: 'product',
    minWidth: 50,
    maxWidth: 190,
    align: 'left',
  },
  { id: 'units', label: 'units', minWidth: 50, align: 'right' },
  { id: 'amount', label: 'amount', minWidth: 50, align: 'right' },
  {
    id: 'unit_price',
    label: 'unit_price',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'fee_percentage',
    label: 'fee_percentage',
    minWidth: 50,
    align: 'right',
  },
  { id: 'subtotal', label: 'subtotal', minWidth: 50, align: 'right' },
];

interface MainTableProps {
  selectedItem: ReportDetailForm | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ReportDetailForm | null>
  >;
}
export default function MainTable({
  selectedItem,
  setSelectedItem,
}: MainTableProps) {
  const classes = useStyles();

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { indexProductName, indexProductTypeId } = useProduct();

  const { indexProductTypeName } = useExtraTypes();

  const {
    dispatch: { translate },
  } = useLanguage();

  const handleClick = (detail: ReportDetailForm) => {
    if (detail === selectedItem) {
      setSelectedItem(null);
    } else {
      setSelectedItem(detail);
    }
  };

  return (
    <Paper className={classes.paper}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} size="small" stickyHeader>
          <TableHead>
            <TableRow className={classes.row}>
              {/* <TableCell padding="checkbox" /> */}
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  <Box fontWeight="fontWeightBold">
                    {translate(column.label)}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {invoiceForm.report_details.map(
              (detail: ReportDetailForm | any, index) => (
                <TableRow
                  hover
                  key={`detailRow${index}`}
                  className={classes.row}
                  selected={detail === selectedItem}
                  onClick={(e) => handleClick(detail)}
                >
                  {/* <TableCell padding="checkbox" style={{ minWidth: 5 }}>
                    <Checkbox size="small" checked={detail === selectedItem} />
                  </TableCell> */}
                  {columns.map((column) => {
                    let value: string | number = detail[column.id];

                    // getting product_id name
                    if (
                      column.id === 'product_id' &&
                      typeof value === 'number'
                    ) {
                      value = indexProductName(value);
                    }

                    // adding Unity of Measure to Amount and replacing 0 by - if 'amount' is 0
                    if (column.id === 'amount') {
                      let productType = indexProductTypeName(
                        indexProductTypeId(detail.product_id) as number
                      );
                      if (productType === 'unit') {
                        value = '-';
                      } else {
                        value = value.toString();
                        value = parseFloat(value).toFixed(3);
                        value = `${value} ${translate(productType)}`;
                      }
                    }

                    // replacing 0 by - if 'units' is 0
                    if (column.id === 'units') {
                      if (value === 0) {
                        value = '-';
                      }
                    }

                    // adding % to percentage value and remove insignificant zeros
                    if (column.id === 'fee_percentage') {
                      value = value.toString();
                      value = parseFloat(value);
                      if (value === 0) {
                        value = '-';
                      } else if (value < 0) {
                        value = value.toString();
                        value = `${value} %`;
                      } else {
                        value = `+${value} %`;
                      }
                    }

                    // adding $ to money value
                    if (
                      column.id === 'subtotal' ||
                      column.id === 'unit_price'
                    ) {
                      value = value.toString();
                      value = parseFloat(value).toFixed(2);
                      value = `$ ${value}`;
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
