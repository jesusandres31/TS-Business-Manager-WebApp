import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { ExtraTypes } from '../../api/extra.services';
import * as extraSvcs from '../../api/extra.services';

// Interfaces
interface RolesState {
  loading: boolean;
  error: boolean | string;
  roles: ExtraTypes[];
}

// Initial state
const initialState: RolesState = {
  loading: false,
  error: false,
  roles: [],
};

// A slice for roles with our three reducers
const roles = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    getRolesStart(state: RolesState) {
      state.loading = true;
      state.error = false;
    },
    getRolesSuccess(
      state: RolesState,
      { payload }: PayloadAction<ExtraTypes[]>
    ) {
      state.roles = payload;
      state.loading = false;
      state.error = false;
    },
    getRolesFailure(state: RolesState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getRolesStart,
  getRolesSuccess,
  getRolesFailure,
} = roles.actions;

// A selector
export const useRolesSelector: TypedUseSelectorHook<RootState> = useSelector;

// The reducer
export default roles.reducer;

// Asynchronous thunk action
export const fetchRoles = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getRolesStart());
    const roles = await extraSvcs.fetchRoles();
    dispatch(getRolesSuccess(roles));
  } catch (err) {
    dispatch(getRolesFailure(err));
  }
};
