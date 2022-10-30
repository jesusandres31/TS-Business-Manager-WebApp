import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { ProviderDetail } from '../../api/providerDetail.services';
import * as providerDetailSvcs from '../../api/providerDetail.services';

// Interfaces
interface ProvidersDetailState {
  loading: boolean;
  error: boolean | string;
  providersDetail: ProviderDetail[];
}

// Initial state
const initialState: ProvidersDetailState = {
  loading: false,
  error: false,
  providersDetail: [],
};

// Asynchronous thunk actions
export const fetchProvidersDetail = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getProvidersDetailStart());
    const providersDetail = await providerDetailSvcs.fetchProvidersDetail();
    dispatch(getProvidersDetailSuccess(providersDetail));
  } catch (err) {
    dispatch(getProvidersDetailFailure(err));
  }
};

// Slice
const providersDetail = createSlice({
  name: 'providersDetail',
  initialState,
  reducers: {
    getProvidersDetailStart(state: ProvidersDetailState) {
      state.loading = true;
      state.error = false;
    },
    getProvidersDetailSuccess(
      state: ProvidersDetailState,
      { payload }: PayloadAction<ProviderDetail[]>
    ) {
      state.providersDetail = payload;
      state.loading = false;
      state.error = false;
    },
    getProvidersDetailFailure(
      state: ProvidersDetailState,
      action: PayloadAction<string>
    ) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Actions generated from the slice
export const {
  getProvidersDetailStart,
  getProvidersDetailSuccess,
  getProvidersDetailFailure,
} = providersDetail.actions;

// Selector
export const useProvidersDetailSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default providersDetail.reducer;
