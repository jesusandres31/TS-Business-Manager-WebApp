import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../../features/invoices/invoiceFormSlice';
import {
  updateProducts,
  useProductsSelector,
} from '../../../../../../../../features/products/productsSlice';
// interface
import { ReportDetailForm } from '../../../../../../../../api/invoice.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

interface DeleteProductButtonProps {
  selectedItem: ReportDetailForm | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ReportDetailForm | null>
  >;
}

export default function DeleteProductButton({
  selectedItem,
  setSelectedItem,
}: DeleteProductButtonProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { products } = useProductsSelector((state) => state.products);

  const handleClick = () => {
    // updating product stock in global state
    handleUdpateProductStock();
    // deselecting
    setSelectedItem(null);
    // delete
    let index = invoiceForm.report_details.findIndex(
      (row) => row === selectedItem
    );
    let newArray = [...invoiceForm.report_details];
    newArray.splice(index, 1);
    // calculating total
    let total: number =
      parseFloat(invoiceForm.total as string) -
      parseFloat(invoiceForm.report_details[index].subtotal as string);
    // updating...
    dispatch(
      updateInvoiceForm({
        ...invoiceForm,
        report_details: newArray,
        total: total,
      })
    );
  };

  const handleUdpateProductStock = () => {
    if (selectedItem) {
      let index = products.findIndex(
        (row) => row.id === selectedItem.product_id
      );
      let newArray = [...products];
      // calc..
      let currentStock = newArray[index].stock;
      let units = selectedItem.units;
      let updatedStock = currentStock + parseFloat(units as string);
      // updating array...
      newArray[index] = {
        ...newArray[index],
        stock: updatedStock,
      };
      // updating...
      dispatch(updateProducts(newArray));
    }
  };

  return (
    <Box px={1}>
      <Tooltip
        title={selectedItem ? translate('remove') : ''}
        arrow
        placement="bottom-end"
      >
        <span>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClick}
            disabled={!selectedItem}
          >
            <IconButton
              aria-label="delete"
              size="small"
              disabled={!selectedItem}
            >
              <DeleteForeverRoundedIcon
                color={selectedItem ? 'secondary' : 'inherit'}
              />
            </IconButton>
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
