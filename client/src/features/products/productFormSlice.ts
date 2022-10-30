import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ProductForm } from '../../api/product.services';
import { ProviderDetailForm } from '../../api/providerDetail.services';
import * as productSvcs from '../../api/product.services';

// Interfaces
interface ProductFormState {
  loading: boolean;
  error: boolean | string;
  productForm: ProductForm;
}

// Initial state
const initialState: ProductFormState = {
  loading: false,
  error: false,
  productForm: {
    product_type_id: '',
    name: '',
    stock: '',
    sale_price: '',
    barcode: '',
    min_stock: 0,
    provider_details: [],
  },
};

export const providerDetailsState: ProviderDetailForm = {
  provider_id: '',
  purchase_price: '',
};

// Asynchronous thunk actions
export const fetchProductById = createAsyncThunk(
  'productForm/fetchProductById',
  async (productId: number) => {
    const product = await productSvcs.fetchProductById(productId);
    return product;
  }
);

export const createProduct = createAsyncThunk(
  'productForm/createProduct',
  async (productData: ProductForm) => {
    await productSvcs.createProduct(productData);
  }
);

export const updateProduct = createAsyncThunk(
  'productForm/updateProduct',
  async ({
    productId,
    productData,
  }: {
    productId: number;
    productData: ProductForm;
  }) => {
    await productSvcs.updateProduct(productId, productData);
  }
);

export const disableProduct = createAsyncThunk(
  'productForm/disableProduct',
  async (productId: number) => {
    await productSvcs.disableProduct(productId);
  }
);

export const enableProduct = createAsyncThunk(
  'productForm/enableProduct',
  async (productId: number) => {
    await productSvcs.enableProduct(productId);
  }
);

// Slice
const productForm = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    updateProductForm(
      state: ProductFormState,
      { payload }: PayloadAction<ProductForm>
    ) {
      state.productForm = payload;
    },
    resetProductForm(state: ProductFormState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.productForm = initialState.productForm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(disableProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(disableProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(disableProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(enableProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(enableProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(enableProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const { updateProductForm, resetProductForm } = productForm.actions;

// Selector
export const useProductFormSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default productForm.reducer;
