import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { UserForm } from '../../api/user.services';
import * as userSvcs from '../../api/user.services';

// Interfaces
interface UserFormState {
  loading: boolean;
  error: boolean | string;
  userForm: UserForm;
}

// Initial state
const initialState: UserFormState = {
  loading: false,
  error: false,
  userForm: {
    role_id: '',
    locality: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  },
};

// Asynchronous thunk actions
export const fetchUserById = createAsyncThunk(
  'userForm/fetchUserById',
  async (userId: number) => {
    const users = await userSvcs.fetchUserById(userId);
    return users;
  }
);

export const createUser = createAsyncThunk(
  'userForm/createUser',
  async (userData: UserForm) => {
    await userSvcs.createUser(userData);
  }
);

export const updateUser = createAsyncThunk(
  'userForm/updateUser',
  async ({ userId, userData }: { userId: number; userData: UserForm }) => {
    await userSvcs.updateUser(userId, userData);
  }
);

export const disableUser = createAsyncThunk(
  'userForm/disableUser',
  async (userId: number) => {
    await userSvcs.disableUser(userId);
  }
);

export const enableUser = createAsyncThunk(
  'userForm/enableUser',
  async (userId: number) => {
    await userSvcs.enableUser(userId);
  }
);

export const resetUserPsswd = createAsyncThunk(
  'userForm/resetUserPsswd',
  async (userId: number) => {
    await userSvcs.resetUserPsswd(userId);
  }
);

// Slice
const userForm = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    updateUserForm(state: UserFormState, { payload }: PayloadAction<UserForm>) {
      state.userForm = payload;
    },
    resetUserForm(state: UserFormState) {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.userForm = initialState.userForm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(disableUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(disableUser.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(disableUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
    builder.addCase(enableUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(enableUser.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(enableUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string | boolean;
    });
  },
});

// Actions generated from the slice
export const { updateUserForm, resetUserForm } = userForm.actions;

// Selector
export const useUserFormSelector: TypedUseSelectorHook<RootState> = useSelector;

// Reducer
export default userForm.reducer;
