import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { GlobalConfig, ValueConfig } from '../../api/profile.services';
import * as profileSvcs from '../../api/profile.services';

// Interfaces
interface ProfileFormState {
  loading: boolean;
  error: boolean | string;
  globalConfig: GlobalConfig;
  valueConfig: ValueConfig;
}

// Initial state
const initialState: ProfileFormState = {
  loading: false,
  error: false,
  globalConfig: {
    company_name: '',
    language: '',
    locality: '',
    phone: '',
    email: '',
    website: '',
  },
  valueConfig: {
    payment_type_id: '',
    product_type_id: '',
    sale_type_id: '',
  },
};

// Asynchronous thunk actions
export const updateGlobalConfig = createAsyncThunk(
  'profileForm/updateGlobalConfig',
  async (configData: GlobalConfig) => {
    await profileSvcs.updateGlobalConfig(configData);
  }
);

export const updateValueConfig = createAsyncThunk(
  'profileForm/updateValueConfig',
  async (configData: ValueConfig) => {
    await profileSvcs.updateValueConfig(configData);
  }
);

// Slice
const profileForm = createSlice({
  name: 'profileForm',
  initialState,
  reducers: {
    updateValueConfigForm(
      state: ProfileFormState,
      { payload }: PayloadAction<ValueConfig>
    ) {
      state.valueConfig = payload;
    },
    updateGlobalConfigForm(
      state: ProfileFormState,
      { payload }: PayloadAction<GlobalConfig>
    ) {
      state.globalConfig = payload;
    },
    resetProfileForm(state: ProfileFormState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.globalConfig = initialState.globalConfig;
      state.valueConfig = initialState.valueConfig;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateGlobalConfig.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateGlobalConfig.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateGlobalConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(updateValueConfig.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateValueConfig.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateValueConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const {
  updateGlobalConfigForm,
  updateValueConfigForm,
  resetProfileForm,
} = profileForm.actions;

// Selector
export const useProfileFormSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default profileForm.reducer;
