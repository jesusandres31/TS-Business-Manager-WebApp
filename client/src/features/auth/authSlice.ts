import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AuthUser, LoginForm } from '../../api/auth.services';
import {
  isAuthenticated,
  login,
  logout,
  getAccessToken,
  getRefreshToken,
  getCurrentRoleAndId,
  isRemember,
  /*   getCurrentRole,
  getCurrentUserId, */
} from '../../utils/auth';
import * as authSvcs from '../../api/auth.services';

// Interfaces
interface AuthUserState {
  authLoading: boolean;
  authError: boolean | string;
  loggedIn: boolean;
  authUser: AuthUser;
  refreshing: boolean;
}

// Initial state
const initialState: AuthUserState = {
  authLoading: false,
  authError: false,
  loggedIn: false,
  authUser: {} as AuthUser,
  refreshing: false,
};

// Asynchronous thunk actions
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({
    formData,
    remember,
  }: {
    formData: LoginForm;
    remember: boolean;
  }) => {
    const authUser: AuthUser = await authSvcs.signIn(formData);
    // save token
    login(remember, authUser.accessToken!, authUser.refreshToken!);
    // retrun auth user data
    return authUser;
  }
);

export const refresh = createAsyncThunk('auth/refresh', async () => {
  // check if 'remember me' was true or false
  const remember = isRemember();
  // refresh token
  const authUser: AuthUser = await authSvcs.refresh();
  // save token
  login(remember, authUser.accessToken!, authUser.refreshToken!);
  // retrun auth user data
  return authUser;
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const authUser = {} as AuthUser;
  // checking
  if (isAuthenticated()) {
    authUser.accessToken = getAccessToken()!;
    authUser.refreshToken = getRefreshToken()!;
    const { role, id } = getCurrentRoleAndId(authUser.accessToken)!;
    authUser.role = role;
    authUser.id = id;
    // returning already auth user
    return authUser;
  }
  return { accessToken: null, refreshToken: null, role: null, id: null };
});

export const signOut = createAsyncThunk('auth/signOut', () => {
  // delete token and setting initial state
  logout();
});

// Slice
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.authLoading = true;
      state.loggedIn = false;
      state.authError = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authUser = action.payload;
      state.loggedIn = true;
      state.authLoading = false;
      state.authError = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.authLoading = false;
      state.loggedIn = false;
      state.authError = action.error.message as string | boolean;
    });
    //
    builder.addCase(refresh.pending, (state) => {
      state.refreshing = true;
      state.authLoading = true;
      state.loggedIn = false;
      state.authError = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.refreshing = false;
      state.authUser = action.payload;
      state.loggedIn = true;
      state.authLoading = false;
      state.authError = false;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.refreshing = false;
      state.authLoading = false;
      state.loggedIn = false;
      state.authError = action.error.message as string | boolean;
    });
    //
    builder.addCase(checkAuth.pending, (state) => {
      state.authLoading = true;
      state.loggedIn = false;
      state.authError = false;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.authUser = action.payload;
      state.loggedIn = !!action.payload.accessToken;
      state.authLoading = false;
      state.authError = false;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.authLoading = false;
      state.loggedIn = false;
      state.authError = action.error.message as string | boolean;
    });
    //
    builder.addCase(signOut.pending, (state) => {
      state.authLoading = true;
      state.loggedIn = true;
      state.authError = false;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      // state = initialState;
      state.authUser = initialState.authUser;
      state.loggedIn = initialState.loggedIn;
      state.authLoading = initialState.authLoading;
      state.authError = initialState.authError;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.authLoading = false;
      state.loggedIn = false;
      state.authError = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
// export const {} = auth.actions;

// Selector
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default auth.reducer;
