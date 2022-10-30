import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { Profile } from '../../api/profile.services';
import * as profileSvcs from '../../api/profile.services';

// Interfaces
interface ProfileState {
  loadingDashboard: boolean;
  errorDashboard: boolean | string;
  profile: Profile;
  loading: boolean;
  error: boolean | string;
}

// Initial state
const initialState: ProfileState = {
  loadingDashboard: false,
  errorDashboard: false,
  profile: {} as Profile,
  loading: false,
  error: false,
};

// Asynchronous thunk actions
export const fetchProfileToDashboard = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getProfileToDashboardStart());
    const profile = await profileSvcs.fetchProfile();
    dispatch(getProfileToDashboardSuccess(profile));
  } catch (err) {
    dispatch(getProfileToDashboardFailure(err));
  }
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const profile = await profileSvcs.fetchProfile();
    return profile;
  }
);

// Slice
const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileToDashboardStart(state: ProfileState) {
      state.loadingDashboard = true;
      state.errorDashboard = false;
    },
    getProfileToDashboardSuccess(
      state: ProfileState,
      { payload }: PayloadAction<Profile>
    ) {
      state.profile = payload;
      state.loadingDashboard = false;
      state.errorDashboard = false;
    },
    getProfileToDashboardFailure(
      state: ProfileState,
      action: PayloadAction<string>
    ) {
      state.loadingDashboard = false;
      state.errorDashboard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const {
  getProfileToDashboardStart,
  getProfileToDashboardSuccess,
  getProfileToDashboardFailure,
} = profile.actions;

// Selector
export const useProfileSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default profile.reducer;
