import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ReportDetail } from '../../api/invoice.services';
import * as invoiceSvcs from '../../api/invoice.services';

// Interfaces
interface InvoiceDetailState {
  loading: boolean;
  error: boolean | string;
  invoiceDetail: ReportDetail[];
}

// Initial state
const initialState: InvoiceDetailState = {
  loading: false,
  error: false,
  invoiceDetail: [],
};

// Asynchronous thunk actions
export const fetchInvoiceDetail = createAsyncThunk(
  'invoiceDetail/fetchInvoiceDetail',
  async (invoiceId: number) => {
    const invoice = await invoiceSvcs.fetchInvoiceDetail(invoiceId);
    return invoice;
  }
);

// Slice
const invoiceDetail = createSlice({
  name: 'invoiceDetail',
  initialState,
  reducers: {
    resetInvoiceDetail(state: InvoiceDetailState) {
      state.invoiceDetail = initialState.invoiceDetail;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoiceDetail.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchInvoiceDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.invoiceDetail = action.payload;
    });
    builder.addCase(fetchInvoiceDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const { resetInvoiceDetail } = invoiceDetail.actions;

// Selector
export const useInvoiceDetailSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default invoiceDetail.reducer;
