import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../../features/invoices/invoiceFormSlice';
import {
  resetInvoiceDetailForm,
  useInvoiceDetailFormSelector,
} from '../../../../../../../../features/invoices/invoiceDetailFormSlice';
import {
  updateProducts,
  useProductsSelector,
} from '../../../../../../../../features/products/productsSlice';
// interface
import { ReportDetailForm } from '../../../../../../../../api/invoice.services';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hook
import { useIsProductTypeUnit } from '../../../../../common/hooks/useIsProductTypeUnit';
import { useIsPaymentTypeCheckingAcc } from '../../../../../common/hooks/useIsPaymentTypeCheckingAcc';

interface AddProductButtonProps {
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ReportDetailForm | null>
  >;
}

export default function AddProductButton({
  setSelectedItem,
}: AddProductButtonProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { isProductTypeUnit } = useIsProductTypeUnit();

  const { isPaymentTypeCheckingAcc } = useIsPaymentTypeCheckingAcc();

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { products } = useProductsSelector((state) => state.products);

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  const [enableButton, setEnableButton] = useState(false);

  useEffect(() => {
    if (
      invoiceDetailForm.product_id === '' ||
      invoiceDetailForm.subtotal === '' ||
      invoiceDetailForm.unit_price === '' ||
      (isProductTypeUnit && invoiceDetailForm.units === '') ||
      (!isProductTypeUnit && invoiceDetailForm.amount === '')
    ) {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  }, [invoiceDetailForm]);

  const handleClick = () => {
    // add
    let index = invoiceForm.report_details.length;
    let newArray = [...invoiceForm.report_details];
    // newArray[index] = invoiceDetailForm;
    newArray[index] = {
      ...newArray[index],
      product_id: invoiceDetailForm.product_id,
      amount: invoiceDetailForm.amount ? invoiceDetailForm.amount : 0,
      units: invoiceDetailForm.units ? invoiceDetailForm.units : 0,
      unit_price: invoiceDetailForm.unit_price,
      subtotal: invoiceDetailForm.subtotal,
      fee_percentage: invoiceDetailForm.fee_percentage
        ? invoiceDetailForm.fee_percentage
        : 0,
    };
    // calculating total
    let total: number =
      parseFloat(invoiceForm.total as string) +
      parseFloat(invoiceDetailForm.subtotal as string);
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
        total: total,
        payment: payment,
        debt: debt,
      })
    );
    // updating product stock in global state
    handleUdpateProductStock();
    // resetting invoice detail form
    dispatch(resetInvoiceDetailForm());
    // deselecting
    setSelectedItem(null);
  };

  const handleUdpateProductStock = () => {
    let index = products.findIndex(
      (row) => row.id === invoiceDetailForm.product_id
    );
    let newArray = [...products];
    // calc..
    let currentStock = newArray[index].stock;
    let units = invoiceDetailForm.units ? invoiceDetailForm.units : 0;
    let updatedStock = currentStock - parseFloat(units as string);
    // updating array...
    newArray[index] = {
      ...newArray[index],
      stock: updatedStock,
    };
    // updating...
    dispatch(updateProducts(newArray));
  };

  return (
    <Box px={1}>
      <Tooltip
        title={enableButton ? translate('confirm') : ''}
        arrow
        placement="bottom-end"
      >
        <span>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClick}
            disabled={!enableButton}
          >
            <IconButton aria-label="add" size="small" disabled={!enableButton}>
              <CheckCircleRoundedIcon
                color={enableButton ? 'primary' : 'inherit'}
              />
            </IconButton>
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
