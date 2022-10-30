import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// global state
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  updateInvoiceDetailForm,
  useInvoiceDetailFormSelector,
} from '../../../../../../../../../features/invoices/invoiceDetailFormSlice';
// context
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
import { useFilter } from '../../../../../../common/context/FilterContext';
// hooks
import { useProduct } from '../../../../../../../../../hooks/useProduct';
// components
import { DialogTitle } from '../../../../../../common/Forms/FormHeader';
import { DialogActions } from '../../../../../../common/Forms/FormFooter';
import SearchProductTable from './content/SearchProductTable';
import { SearchField } from '../../../../../../common/Table/Header/Buttons';

interface SelectProductDialogProps {
  searchProductDialog: boolean;
  setSearchProductDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectProductDialog({
  searchProductDialog,
  setSearchProductDialog,
}: SelectProductDialogProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  const { indexProductSalePrice } = useProduct();

  const { setFilter } = useFilter();

  const [selectedItem, setSelectedItem] = useState<number | string>('');

  const handleClose = () => {
    setSearchProductDialog(false);
    setSelectedItem('');
    setFilter('');
  };

  const handleSubmit = () => {
    let unitPriceValue = indexProductSalePrice(selectedItem as number);
    // updating...
    dispatch(
      updateInvoiceDetailForm({
        ...invoiceDetailForm,
        product_id: selectedItem as number,
        unit_price: unitPriceValue,
        units: '',
        amount: '',
        fee_percentage: '',
        subtotal: '',
      })
    );
    handleClose();
  };

  return (
    <>
      <Dialog
        open={searchProductDialog}
        keepMounted
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="simple-dialog"
      >
        <DialogTitle id="alert-dialog-slide-title" onClose={handleClose}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ display: 'inline-block' }}
              >
                {`${translate('select')} ${translate('_product')} 📦`}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Box mr={3}>
                <SearchField />
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>

        <Box mx={1}>
          <SearchProductTable
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            searchProductDialog={searchProductDialog}
          />
        </Box>

        <DialogActions>
          <Tooltip
            title={
              !selectedItem!! && searchProductDialog
                ? translate('selectAProduct')
                : ''
            }
            arrow
            placement="left-end"
          >
            <span>
              <Button
                autoFocus
                color="primary"
                variant="outlined"
                style={{ fontWeight: 600 }}
                onClick={handleSubmit}
                disabled={!selectedItem!!}
              >
                {translate('confirm')}
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
}
