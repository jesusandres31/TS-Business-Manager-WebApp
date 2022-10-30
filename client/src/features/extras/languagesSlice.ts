import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { AppThunk } from '../../app/store';
import { ExtraTypes } from '../../api/extra.services';
import * as extraSvcs from '../../api/extra.services';

// Interfaces
interface LanguagesState {
  loading: boolean;
  error: boolean | string;
  languages: ExtraTypes[];
}

// Initial state
const initialState: LanguagesState = {
  loading: false,
  error: false,
  languages: [],
};

// A slice for languages with our three reducers
const languages = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    getLanguagesStart(state: LanguagesState) {
      state.loading = true;
      state.error = false;
    },
    getLanguagesSuccess(
      state: LanguagesState,
      { payload }: PayloadAction<ExtraTypes[]>
    ) {
      state.languages = payload;
      state.loading = false;
      state.error = false;
    },
    getLanguagesFailure(state: LanguagesState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getLanguagesStart,
  getLanguagesSuccess,
  getLanguagesFailure,
} = languages.actions;

// A selector
export const useLanguagesSelector: TypedUseSelectorHook<RootState> = useSelector;

// The reducer
export default languages.reducer;

// Asynchronous thunk action
export const fetchLanguages = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getLanguagesStart());
    const languages = await extraSvcs.fetchLanguages();
    dispatch(getLanguagesSuccess(languages));
  } catch (err) {
    dispatch(getLanguagesFailure(err));
  }
};
