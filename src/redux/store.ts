import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import forgotPasswordReducer from './features/forgotPassword/forgotPasswordSlice';
import utilsReducer from './features/utils/utilsSlice';
import appDataReducer from './features/appData/appDataSlice';
import myBookingReducer from './features/myBooking/myBookingSlice';
import garagesReducer from './features/garages/garagesSlice';
import vehiclesReducer from './features/vehicles/vehiclesSlice';
import orderReducer from './features/order/orderSlice';
import userReducer from './features/user/userSlice';
import notificationReducer from './features/notifications/notificationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const reducers = combineReducers({
  auth: authReducer,
  utils: utilsReducer,
  forgotPassword: forgotPasswordReducer,
  appData: appDataReducer,
  myBooking: myBookingReducer,
  garages: garagesReducer,
  vehicles: vehiclesReducer,
  order: orderReducer,
  user: userReducer,
  notification: notificationReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: {
//     // counter: counterReducer,
//     appData: appDataSlice,
//     auth: authSlice,
//   },
// });
const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk]
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        serializableCheck: false,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export {persistor};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
