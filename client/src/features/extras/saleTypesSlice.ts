import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { ExtraTypes } from '../../api/extra.services';
import * as extraSvcs from '../../api/extra.services';

// Interfaces
interface SaleTypesState {
  loading: boolean;
  error: boolean | string;
  saleTypes: ExtraTypes[];
}

// Initial state
const initialState: SaleTypesState = {
  loading: false,
  error: false,
  saleTypes: [],
};

// A slice for saleTypes with our three reducers
const saleTypes = createSlice({
  name: 'saleTypes',
  initialState,
  reducers: {
    getSaleTypesStart(state: SaleTypesState) {
      state.loading = true;
      state.error = false;
    },
    getSaleTypesSuccess(
      state: SaleTypesState,
      { payload }: PayloadAction<ExtraTypes[]>
    ) {
      state.saleTypes = payload;
      state.loading = false;
      state.error = false;
    },
    getSaleTypesFailure(state: SaleTypesState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getSaleTypesStart,
  getSaleTypesSuccess,
  getSaleTypesFailure,
} = saleTypes.actions;

// A selector
export const useSaleTypesSelector: TypedUseSelectorHook<RootState> = useSelector;

// The reducer
export default saleTypes.reducer;

// Asynchronous thunk action
export const fetchSaleTypes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getSaleTypesStart());
    const saleTypes = await extraSvcs.fetchSaleTypes();
    dispatch(getSaleTypesSuccess(saleTypes));
  } catch (err) {
    dispatch(getSaleTypesFailure(err));
  }
};
