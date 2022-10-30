import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import rootReducer, { RootState } from './rootReducer';
// middlewares
import {
  checkLegitToken,
  checkTokenExpiration,
} from '../middleware/authMiddleware';

const store = configureStore({
  reducer: rootReducer,
  // disabling meddleware for development mode only.
  // they are already disabled in builds.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(checkLegitToken, checkTokenExpiration),
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type AppDispatch = typeof store.dispatch;

// dispatch to be used in components
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
