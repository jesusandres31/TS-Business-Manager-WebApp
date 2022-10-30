import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { Client } from '../../api/client.services';
import * as clientSvcs from '../../api/client.services';

// Interfaces
interface ClientsState {
  loading: boolean;
  error: boolean | string;
  clients: Client[];
  client: Client | null;
}

// Initial state
const initialState: ClientsState = {
  loading: false,
  error: false,
  clients: [],
  client: null,
};

// Asynchronous thunk actions
export const fetchClients = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getClientsStart());
    const clients = await clientSvcs.fetchClients();
    dispatch(getClientsSuccess(clients));
  } catch (err) {
    dispatch(getClientsFailure(err));
  }
};

// Slice
const clients = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    getClientsStart(state: ClientsState) {
      state.loading = true;
      state.error = false;
    },
    getClientsSuccess(
      state: ClientsState,
      { payload }: PayloadAction<Client[]>
    ) {
      state.clients = payload;
      state.loading = false;
      state.error = false;
    },
    getClientsFailure(state: ClientsState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetClientsWithDebt(state: ClientsState) {
      state.clients = initialState.clients;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
    selectClient(
      state: ClientsState,
      { payload }: PayloadAction<Client | null>
    ) {
      state.client = payload;
    },
  },
});

// Actions generated from the slice
export const {
  getClientsStart,
  getClientsSuccess,
  getClientsFailure,
  resetClientsWithDebt,
  selectClient,
} = clients.actions;

// Selector
export const useClientsSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default clients.reducer;
