import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { Product } from '../../api/product.services';
import * as productSvcs from '../../api/product.services';

// Interfaces
interface ProductsState {
  loading: boolean;
  error: boolean | string;
  products: Product[];
  product: Product | null;
}

// Initial state
const initialState: ProductsState = {
  loading: false,
  error: false,
  products: [],
  product: null,
};

// Asynchronous thunk actions
export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getProductsStart());
    const products = await productSvcs.fetchProducts();
    dispatch(getProductsSuccess(products));
  } catch (err) {
    dispatch(getProductsFailure(err));
  }
};

// Slice
const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsStart(state: ProductsState) {
      state.loading = true;
      state.error = false;
    },
    getProductsSuccess(
      state: ProductsState,
      { payload }: PayloadAction<Product[]>
    ) {
      state.products = payload;
      state.loading = false;
      state.error = false;
    },
    getProductsFailure(state: ProductsState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProducts(
      state: ProductsState,
      { payload }: PayloadAction<Product[]>
    ) {
      state.products = payload;
    },
    selectProduct(
      state: ProductsState,
      { payload }: PayloadAction<Product | null>
    ) {
      state.product = payload;
    },
  },
});

// Actions generated from the slice
export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  updateProducts, // used in invoice for stock updating
  selectProduct,
} = products.actions;

// Selector
export const useProductsSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default products.reducer;
