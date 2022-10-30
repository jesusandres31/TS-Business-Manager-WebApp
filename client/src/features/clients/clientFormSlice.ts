import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ClientForm, UpdateClientDebtForm } from '../../api/client.services';
import * as clientSvcs from '../../api/client.services';

// Interfaces
interface ClientFormState {
  loading: boolean;
  error: boolean | string;
  clientForm: ClientForm;
}

// Initial state
const initialState: ClientFormState = {
  loading: false,
  error: false,
  clientForm: {
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
export const fetchClientById = createAsyncThunk(
  'clientForm/fetchClientById',
  async (clientId: number) => {
    const clients = await clientSvcs.fetchClientById(clientId);
    return clients;
  }
);

export const createClient = createAsyncThunk(
  'clientForm/createClient',
  async (clientData: ClientForm) => {
    await clientSvcs.createClient(clientData);
  }
);

export const updateClient = createAsyncThunk(
  'clientForm/updateClient',
  async ({
    clientId,
    clientData,
  }: {
    clientId: number;
    clientData: ClientForm;
  }) => {
    await clientSvcs.updateClient(clientId, clientData);
  }
);

export const updateClientDebt = createAsyncThunk(
  'clientForm/updateClientDebt',
  async (clientDebtForm: UpdateClientDebtForm) => {
    await clientSvcs.updateClientDebt(clientDebtForm);
  }
);

export const disableClient = createAsyncThunk(
  'clientForm/disableClient',
  async (clientId: number) => {
    await clientSvcs.disableClient(clientId);
  }
);

export const enableClient = createAsyncThunk(
  'clientForm/enableClient',
  async (clientId: number) => {
    await clientSvcs.enableClient(clientId);
  }
);

// Slice
const clientForm = createSlice({
  name: 'clientForm',
  initialState,
  reducers: {
    updateClientForm(
      state: ClientFormState,
      { payload }: PayloadAction<ClientForm>
    ) {
      state.clientForm = payload;
    },
    resetClientForm(state: ClientFormState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.clientForm = initialState.clientForm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClientById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchClientById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchClientById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(createClient.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createClient.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(createClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(updateClient.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateClient.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(updateClientDebt.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateClientDebt.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateClientDebt.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(disableClient.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(disableClient.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(disableClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(enableClient.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(enableClient.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(enableClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const { updateClientForm, resetClientForm } = clientForm.actions;

// Selector
export const useClientFormSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default clientForm.reducer;
