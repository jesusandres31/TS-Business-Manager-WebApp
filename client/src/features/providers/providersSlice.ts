import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { Provider } from '../../api/provider.services';
import * as providerSvcs from '../../api/provider.services';

// Interfaces
interface ProvidersState {
  loading: boolean;
  error: boolean | string;
  providers: Provider[];
  provider: Provider | null;
}

// Initial state
const initialState: ProvidersState = {
  loading: false,
  error: false,
  providers: [],
  provider: null,
};

// Asynchronous thunk actions
export const fetchProviders = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getProvidersStart());
    const providers = await providerSvcs.fetchProviders();
    dispatch(getProvidersSuccess(providers));
  } catch (err) {
    dispatch(getProvidersFailure(err));
  }
};

// Slice
const providers = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    getProvidersStart(state: ProvidersState) {
      state.loading = true;
      state.error = false;
    },
    getProvidersSuccess(
      state: ProvidersState,
      { payload }: PayloadAction<Provider[]>
    ) {
      state.providers = payload;
      state.loading = false;
      state.error = false;
    },
    getProvidersFailure(state: ProvidersState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectProvider(
      state: ProvidersState,
      { payload }: PayloadAction<Provider | null>
    ) {
      state.provider = payload;
    },
  },
});

// Actions generated from the slice
export const {
  getProvidersStart,
  getProvidersSuccess,
  getProvidersFailure,
  selectProvider,
} = providers.actions;

// Selector
export const useProvidersSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default providers.reducer;
