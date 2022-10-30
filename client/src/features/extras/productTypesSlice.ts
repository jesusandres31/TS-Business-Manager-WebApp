import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { ExtraTypes } from '../../api/extra.services';
import * as extraSvcs from '../../api/extra.services';

// Interfaces
interface ProductTypesState {
  loading: boolean;
  error: boolean | string;
  productTypes: ExtraTypes[];
}

// Initial state
const initialState: ProductTypesState = {
  loading: false,
  error: false,
  productTypes: [],
};

// A slice for productTypes with our three reducers
const productTypes = createSlice({
  name: 'productTypes',
  initialState,
  reducers: {
    getProductTypesStart(state: ProductTypesState) {
      state.loading = true;
      state.error = false;
    },
    getProductTypesSuccess(
      state: ProductTypesState,
      { payload }: PayloadAction<ExtraTypes[]>
    ) {
      state.productTypes = payload;
      state.loading = false;
      state.error = false;
    },
    getProductTypesFailure(
      state: ProductTypesState,
      action: PayloadAction<string>
    ) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getProductTypesStart,
  getProductTypesSuccess,
  getProductTypesFailure,
} = productTypes.actions;

// A selector
export const useProductTypesSelector: TypedUseSelectorHook<RootState> = useSelector;

// The reducer
export default productTypes.reducer;

// Asynchronous thunk action
export const fetchProductTypes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getProductTypesStart());
    const productTypes = await extraSvcs.fetchProductTypes();
    dispatch(getProductTypesSuccess(productTypes));
  } catch (err) {
    dispatch(getProductTypesFailure(err));
  }
};
