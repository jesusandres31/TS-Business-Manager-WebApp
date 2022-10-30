import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { User } from '../../api/user.services';
import * as settingsSvcs from '../../api/setting.services';

// Interfaces
interface SettingsState {
  loading: boolean;
  error: boolean | string;
  user: User;
}

// Initial state
const initialState: SettingsState = {
  loading: false,
  error: false,
  user: {} as User,
};

// Asynchronous thunk actions
export const fetchMyUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchMyUserStart());
    const myUser = await settingsSvcs.getMyUser();
    dispatch(fetchMyUserSuccess(myUser));
  } catch (err) {
    dispatch(fetchMyUserFailure(err));
  }
};

// Slice
const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    fetchMyUserStart(state: SettingsState) {
      state.loading = true;
      state.error = false;
    },
    fetchMyUserSuccess(state: SettingsState, { payload }: PayloadAction<User>) {
      state.user = payload;
      state.loading = false;
      state.error = false;
    },
    fetchMyUserFailure(state: SettingsState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Actions generated from the slice
export const {
  fetchMyUserStart,
  fetchMyUserSuccess,
  fetchMyUserFailure,
} = settings.actions;

// Selector
export const useSettingsSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default settings.reducer;
