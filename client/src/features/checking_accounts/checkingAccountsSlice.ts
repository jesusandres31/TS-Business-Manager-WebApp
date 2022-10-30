import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { CheckingAcc } from '../../api/checkingAccount.services';
import * as checkingAccSvcs from '../../api/checkingAccount.services';

// Interfaces
interface CheckingAccountsState {
  loading: boolean;
  error: boolean | string;
  checkingAccounts: CheckingAcc[];
}

// Initial state
const initialState: CheckingAccountsState = {
  loading: false,
  error: false,
  checkingAccounts: [],
};

// Asynchronous thunk actions
export const fetchCheckingAccByClient = createAsyncThunk(
  'providerForm/fetchCheckingAccByClient',
  async ({
    clientId,
    pageNumber,
  }: {
    clientId: number;
    pageNumber: number;
  }) => {
    const checkingAccounts = await checkingAccSvcs.fetchCheckingAccByClient(
      clientId,
      pageNumber
    );
    return checkingAccounts;
  }
);

// A slice for checkingAccounts with our three reducers
const checkingAccounts = createSlice({
  name: 'checkingAccounts',
  initialState,
  reducers: {
    resetCheckingAccounts(state: CheckingAccountsState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.checkingAccounts = initialState.checkingAccounts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCheckingAccByClient.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCheckingAccByClient.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.checkingAccounts = action.payload;
    });
    builder.addCase(fetchCheckingAccByClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Three actions generated from the slice
export const { resetCheckingAccounts } = checkingAccounts.actions;

// A selector
export const useCheckingAccountsSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// The reducer
export default checkingAccounts.reducer;
