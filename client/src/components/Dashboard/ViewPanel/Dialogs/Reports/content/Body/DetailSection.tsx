import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
// global context
import { useInvoiceDetailFormSelector } from '../../../../../../../features/invoices/invoiceDetailFormSlice';
// interface
import { ReportDetailForm } from '../../../../../../../api/invoice.services';
// hooks
import { useIsProductTypeUnit } from '../../../../common/hooks/useIsProductTypeUnit';
// child componentes
import ProductInput from './Detail/ProductInput';
import AmountInput from './Detail/AmountInput';
import UnitsInput from './Detail/UnitsInput';
import UnitPriceInput from './Detail/UnitPriceInput';
import FeePercentageInput from './Detail/FeePercentageInput';
import Subtotal from './Detail/SubtotalInput';
import AddProductButton from './Detail/AddProductButton';
import SearchProductButton from './Detail/SearchProductButton';
import UpdateProductButton from './Detail/UpdateProductButton';
import DeleteProductButton from './Detail/DeleteProductButton';

interface DetailSectionProps {
  classes: any;
  selectedItem: ReportDetailForm | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ReportDetailForm | null>
  >;
}

export default function DetailSection({
  classes,
  selectedItem,
  setSelectedItem,
}: DetailSectionProps) {
  const [searchProductDialog, setSearchProductDialog] = React.useState(false);

  const { isProductTypeUnit } = useIsProductTypeUnit();

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  return (
    <Container className={classes.container}>
      <FormGroup>
        <Box pb={2}>
          <Grid container spacing={2} className={classes.content}>
            <Grid item xs={12} sm={1}>
              <Box display="flex" justifyContent="center">
                <SearchProductButton
                  searchProductDialog={searchProductDialog}
                  setSearchProductDialog={setSearchProductDialog}
                />
              </Box>
            </Grid>

            {isProductTypeUnit || invoiceDetailForm.product_id === '' ? (
              <>
                <Grid item xs={12} sm={5}>
                  <Box display="flex" justifyContent="center">
                    <ProductInput />
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={3}>
                  <Box display="flex" justifyContent="center">
                    <ProductInput />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Box display="flex" justifyContent="center">
                    <AmountInput />
                  </Box>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={2}>
              <Box display="flex" justifyContent="center">
                <UnitsInput />
              </Box>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Box display="flex" justifyContent="center">
                <UnitPriceInput />
              </Box>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Box display="flex" justifyContent="center">
                <FeePercentageInput />
              </Box>
            </Grid>
          </Grid>

          <Box pt={2}>
            <Grid container spacing={2} className={classes.content}>
              <Grid item xs={12} sm={2}>
                <Box display="flex" justifyContent="center">
                  <Subtotal />
                </Box>
              </Grid>

              <Grid item xs={12} sm={1}>
                <Box display="flex" justifyContent="center">
                  <AddProductButton setSelectedItem={setSelectedItem} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={1}>
                <Box display="flex" justifyContent="center">
                  <UpdateProductButton
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={1}>
                <Box display="flex" justifyContent="center">
                  <DeleteProductButton
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={7}>
                <Box display="flex" justifyContent="center">
                  {/* <Divider orientation="vertical" /> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </FormGroup>
      <Box pt={1}>{/* <Divider variant="fullWidth" /> */}</Box>
    </Container>
  );
}
