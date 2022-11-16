import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import utilsReducer from './features/utils/utilsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
