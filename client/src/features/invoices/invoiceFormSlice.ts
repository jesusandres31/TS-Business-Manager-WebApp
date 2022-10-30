import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ReportMasterForm } from '../../api/invoice.services';
import { IDate } from '../../interfaces';
import * as invoiceSvcs from '../../api/invoice.services';

// Interfaces
interface InvoiceFormState {
  loading: boolean;
  error: boolean | string;
  invoiceForm: ReportMasterForm;
}

// Initial state
const initialState: InvoiceFormState = {
  loading: false,
  error: false,
  invoiceForm: {
    client_id: '',
    user_id: '',
    sale_type_id: '',
    payment_type_id: '',
    created: '',
    fee_percentageTotal: 0,
    total: 0,
    payment: 0,
    debt: 0,
    old_debt: 0,
    report_details: [],
  },
};

// Asynchronous thunk actions
export const fetchInvoiceById = createAsyncThunk(
  'invoiceForm/fetchInvoiceById',
  async (invoiceId: number) => {
    const invoice = await invoiceSvcs.fetchInvoiceById(invoiceId);
    return invoice;
  }
);

export const createInvoice = createAsyncThunk(
  'invoiceForm/createinvoice',
  async (invoiceData: ReportMasterForm) => {
    await invoiceSvcs.createInvoice(invoiceData);
  }
);

export const updateInvoice = createAsyncThunk(
  'invoiceForm/updateInvoice',
  async ({
    invoiceId,
    invoiceData,
  }: {
    invoiceId: number;
    invoiceData: ReportMasterForm;
  }) => {
    await invoiceSvcs.updateInvoice(invoiceId, invoiceData);
  }
);

export const deleteInvoice = createAsyncThunk(
  'invoiceForm/deleteInvoice',
  async (invoiceId: number) => {
    await invoiceSvcs.deleteInvoice(invoiceId);
  }
);

export const fetchArticlesToDistribute = createAsyncThunk(
  'invoices/fetchArticlesToDistribute',
  async (date: IDate) => {
    const articles = await invoiceSvcs.fetchArticlesToDistribute(date);
    return articles;
  }
);

// Slice
const invoiceForm = createSlice({
  name: 'invoiceForm',
  initialState,
  reducers: {
    updateInvoiceForm(
      state: InvoiceFormState,
      { payload }: PayloadAction<ReportMasterForm>
    ) {
      state.invoiceForm = payload;
    },
    resetInvoiceForm(state: InvoiceFormState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.invoiceForm = initialState.invoiceForm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoiceById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchInvoiceById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchInvoiceById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(createInvoice.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createInvoice.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(updateInvoice.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateInvoice.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(deleteInvoice.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteInvoice.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(fetchArticlesToDistribute.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchArticlesToDistribute.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchArticlesToDistribute.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const { updateInvoiceForm, resetInvoiceForm } = invoiceForm.actions;

// Selector
export const useInvoiceFormSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default invoiceForm.reducer;
