import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { ExtraTypes } from '../../api/extra.services';
import * as extraSvcs from '../../api/extra.services';

// Interfaces
interface PaymentTypesState {
  loading: boolean;
  error: boolean | string;
  paymentTypes: ExtraTypes[];
}

// Initial state
const initialState: PaymentTypesState = {
  loading: false,
  error: false,
  paymentTypes: [],
};

// A slice for paymentTypes with our three reducers
const paymentTypes = createSlice({
  name: 'paymentTypes',
  initialState,
  reducers: {
    getPaymentTypesStart(state: PaymentTypesState) {
      state.loading = true;
      state.error = false;
    },
    getPaymentTypesSuccess(
      state: PaymentTypesState,
      { payload }: PayloadAction<ExtraTypes[]>
    ) {
      state.paymentTypes = payload;
      state.loading = false;
      state.error = false;
    },
    getPaymentTypesFailure(
      state: PaymentTypesState,
      action: PayloadAction<string>
    ) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getPaymentTypesStart,
  getPaymentTypesSuccess,
  getPaymentTypesFailure,
} = paymentTypes.actions;

// A selector
export const usePaymentTypesSelector: TypedUseSelectorHook<RootState> = useSelector;

// The reducer
export default paymentTypes.reducer;

// Asynchronous thunk action
export const fetchPaymentTypes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getPaymentTypesStart());
    const paymentTypes = await extraSvcs.fetchPaymentTypes();
    dispatch(getPaymentTypesSuccess(paymentTypes));
  } catch (err) {
    dispatch(getPaymentTypesFailure(err));
  }
};
