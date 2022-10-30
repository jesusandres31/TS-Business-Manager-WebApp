import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ReportDetailForm } from '../../api/invoice.services';

// Interfaces
interface InvoiceDetailFormState {
  loading: boolean;
  error: boolean | string;
  invoiceDetailForm: ReportDetailForm;
}

// Initial state
const initialState: InvoiceDetailFormState = {
  loading: false,
  error: false,
  invoiceDetailForm: {
    product_id: '',
    amount: '',
    units: '',
    unit_price: '',
    fee_percentage: '',
    subtotal: '',
  },
};

// Asynchronous thunk actions

// Slice
const invoiceDetailForm = createSlice({
  name: 'invoiceDetailForm',
  initialState,
  reducers: {
    updateInvoiceDetailForm(
      state: InvoiceDetailFormState,
      { payload }: PayloadAction<ReportDetailForm>
    ) {
      state.invoiceDetailForm = payload;
    },
    resetInvoiceDetailForm(state: InvoiceDetailFormState) {
      state.invoiceDetailForm = initialState.invoiceDetailForm;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
  },
});

// Actions generated from the slice
export const { updateInvoiceDetailForm, resetInvoiceDetailForm } =
  invoiceDetailForm.actions;

// Selector
export const useInvoiceDetailFormSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default invoiceDetailForm.reducer;
