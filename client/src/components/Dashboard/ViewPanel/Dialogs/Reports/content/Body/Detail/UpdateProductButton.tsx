import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../../features/invoices/invoiceFormSlice';
import { updateInvoiceDetailForm } from '../../../../../../../../features/invoices/invoiceDetailFormSlice';
import {
  updateProducts,
  useProductsSelector,
} from '../../../../../../../../features/products/productsSlice';
// interface
import { ReportDetailForm } from '../../../../../../../../api/invoice.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useIsPaymentTypeCheckingAcc } from '../../../../../common/hooks/useIsPaymentTypeCheckingAcc';

interface UpdateProductButtonProps {
  selectedItem: ReportDetailForm | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ReportDetailForm | null>
  >;
}

export default function UpdateProductButton({
  selectedItem,
  setSelectedItem,
}: UpdateProductButtonProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { isPaymentTypeCheckingAcc } = useIsPaymentTypeCheckingAcc();

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { products } = useProductsSelector((state) => state.products);

  const handleClick = () => {
    // updating product stock in global state
    handleUdpateProductStock();
    // deselecting
    setSelectedItem(null);
    // deleting
    handleDeletPorductFromTable();
    // update
    let detailToUpdate = invoiceForm.report_details.find(
      (row) => row === selectedItem
    );
    // updating...
    if (detailToUpdate) {
      dispatch(updateInvoiceDetailForm(detailToUpdate));
    }
  };

  const handleDeletPorductFromTable = () => {
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
    // calculating payment
    let payment = isPaymentTypeCheckingAcc ? 0 : total;
    // calculating debt
    let debt =
      parseFloat(invoiceForm.total as string) -
      parseFloat(invoiceForm.payment as string);
    // updating...
    dispatch(
      updateInvoiceForm({
        ...invoiceForm,
        report_details: newArray,
        fee_percentageTotal: 0,
        total: total,
        payment: payment,
        debt: debt,
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
        title={selectedItem ? translate('edit') : ''}
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
              aria-label="update"
              size="small"
              disabled={!selectedItem}
            >
              <BorderColorRoundedIcon
                color={selectedItem ? 'secondary' : 'inherit'}
              />
            </IconButton>
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
