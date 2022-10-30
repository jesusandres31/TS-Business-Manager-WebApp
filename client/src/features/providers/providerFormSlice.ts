import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ProviderForm } from '../../api/provider.services';
import * as providerSvcs from '../../api/provider.services';

// Interfaces
interface ProviderFormState {
  loading: boolean;
  error: boolean | string;
  providerForm: ProviderForm;
}

// Initial state
const initialState: ProviderFormState = {
  loading: false,
  error: false,
  providerForm: {
    locality: '',
    company_name: '',
    tax_id: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
  },
};

// Asynchronous thunk actions
export const fetchProviderById = createAsyncThunk(
  'providerForm/fetchProviderById',
  async (providerId: number) => {
    const providers = await providerSvcs.fetchProviderById(providerId);
    return providers;
  }
);

export const createProvider = createAsyncThunk(
  'providerForm/createProvider',
  async (providerData: ProviderForm) => {
    await providerSvcs.createProvider(providerData);
  }
);

export const updateProvider = createAsyncThunk(
  'providerForm/updateProvider',
  async ({
    providerId,
    providerData,
  }: {
    providerId: number;
    providerData: ProviderForm;
  }) => {
    await providerSvcs.updateProvider(providerId, providerData);
  }
);

export const disableProvider = createAsyncThunk(
  'providerForm/disableProvider',
  async (providerId: number) => {
    await providerSvcs.disableProvider(providerId);
  }
);

export const enableProvider = createAsyncThunk(
  'providerForm/enableProvider',
  async (providerId: number) => {
    await providerSvcs.enableProvider(providerId);
  }
);

// Slice
const providerForm = createSlice({
  name: 'providerForm',
  initialState,
  reducers: {
    updateProviderForm(
      state: ProviderFormState,
      { payload }: PayloadAction<ProviderForm>
    ) {
      state.providerForm = payload;
    },
    resetProviderForm(state: ProviderFormState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.providerForm = initialState.providerForm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProviderById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProviderById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchProviderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(createProvider.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createProvider.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(createProvider.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(updateProvider.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateProvider.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateProvider.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(disableProvider.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(disableProvider.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(disableProvider.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(enableProvider.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(enableProvider.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(enableProvider.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const { updateProviderForm, resetProviderForm } = providerForm.actions;

// Selector
export const useProviderFormSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default providerForm.reducer;
