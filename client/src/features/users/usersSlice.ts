import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { User } from '../../api/user.services';
import * as userSvcs from '../../api/user.services';

// Interfaces
interface UsersState {
  loading: boolean;
  error: boolean | string;
  users: User[];
  user: User | null;
}

// Initial state
const initialState: UsersState = {
  loading: false,
  error: false,
  users: [],
  user: null,
};

// Asynchronous thunk actions
export const fetchUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUsersStart());
    const users = await userSvcs.fetchUsers();
    dispatch(getUsersSuccess(users));
  } catch (err) {
    dispatch(getUsersFailure(err));
  }
};

// Slice
const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersStart(state: UsersState) {
      state.loading = true;
      state.error = false;
    },
    getUsersSuccess(state: UsersState, { payload }: PayloadAction<User[]>) {
      state.users = payload;
      state.loading = false;
      state.error = false;
    },
    getUsersFailure(state: UsersState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectUser(state: UsersState, { payload }: PayloadAction<User | null>) {
      state.user = payload;
    },
  },
});

// Actions generated from the slice
export const { getUsersStart, getUsersSuccess, getUsersFailure, selectUser } =
  users.actions;

// Selector
export const useUsersSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default users.reducer;
