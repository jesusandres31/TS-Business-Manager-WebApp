import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { SettingsForm } from '../../api/setting.services';
import * as settingsSvcs from '../../api/setting.services';

// Interfaces
interface SettingsFormState {
  loading: boolean;
  error: boolean | string;
  settings: SettingsForm;
}

// Initial state
const initialState: SettingsFormState = {
  loading: false,
  error: false,
  settings: {
    username: '',
    password: '',
    new_user_or_psswd: '',
  },
};

// Asynchronous thunk actions
export const changeUsername = createAsyncThunk(
  'settingsForm/changeUsername',
  async (settingData: SettingsForm) => {
    await settingsSvcs.changeUsername(settingData);
  }
);

export const changePsswd = createAsyncThunk(
  'settingsForm/changePsswd',
  async (settingData: SettingsForm) => {
    await settingsSvcs.changePsswd(settingData);
  }
);

// Slice
const settingsForm = createSlice({
  name: 'settingsForm',
  initialState,
  reducers: {
    updateSettingsForm(
      state: SettingsFormState,
      { payload }: PayloadAction<SettingsForm>
    ) {
      state.settings = payload;
    },
    resetSettingsForm(state: SettingsFormState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.settings = initialState.settings;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeUsername.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(changeUsername.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(changeUsername.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(changePsswd.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(changePsswd.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(changePsswd.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const { updateSettingsForm, resetSettingsForm } = settingsForm.actions;

// Selector
export const useSettingsFormSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default settingsForm.reducer;
