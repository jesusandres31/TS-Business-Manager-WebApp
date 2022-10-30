import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { ReportMaster } from '../../api/invoice.services';
import * as invoiceSvcs from '../../api/invoice.services';

// Interfaces
interface InvoicesState {
  loading: boolean;
  error: boolean | string;
  invoices: ReportMaster[];
  invoice: ReportMaster | null;
}

// Initial state
const initialState: InvoicesState = {
  loading: false,
  error: false,
  invoices: [],
  invoice: null,
};

// Asynchronous thunk actions
export const fetchInvoices = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getInvoicesStart());
    const invoices = await invoiceSvcs.fetchInvoices();
    dispatch(getInvoicesSuccess(invoices));
  } catch (err) {
    dispatch(getInvoicesFailure(err));
  }
};

// Slice
const invoices = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    getInvoicesStart(state: InvoicesState) {
      state.loading = true;
      state.error = false;
    },
    getInvoicesSuccess(
      state: InvoicesState,
      { payload }: PayloadAction<ReportMaster[]>
    ) {
      state.invoices = payload;
      state.loading = false;
      state.error = false;
    },
    getInvoicesFailure(state: InvoicesState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectInvoice(
      state: InvoicesState,
      { payload }: PayloadAction<ReportMaster | null>
    ) {
      state.invoice = payload;
    },
  },
});

// Actions generated from the slice
export const {
  getInvoicesStart,
  getInvoicesSuccess,
  getInvoicesFailure,
  selectInvoice,
} = invoices.actions;

// Selector
export const useInvoicesSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default invoices.reducer;
