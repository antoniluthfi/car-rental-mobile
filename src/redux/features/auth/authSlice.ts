import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { authLogin, authRegister, authRegisterConfirmation, refreshToken } from './authAPI';

interface IInitState {
  status: string;
  auth: {
    access_token?: string;
    expires_at?: string;
    refresh_token?: string;
  },
  token: {
    session: string;
    token: string;
  },
  isLoading: boolean;
  isSignIn: boolean;
  errors: any;
}

const initialState: IInitState = {
  status: '',
  auth: {},
  isLoading: false,
  isSignIn: false,
  errors: {},
  token: {
    session: '',
    token: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout:(state)=> {
      state.isSignIn = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(authLogin.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.auth = action.payload;
        state.isLoading = false;
        state.isSignIn = true;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      .addCase(authRegister.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('token = ', action.payload)
        state.token = action.payload;
        state.isLoading = false;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        console.log('err = ', action.payload);
        state.errors = action.payload;
      })

      .addCase(authRegisterConfirmation.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(authRegisterConfirmation.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.auth = action.payload;
        state.isLoading = false;
        state.isSignIn = true;
      })
      .addCase(authRegisterConfirmation.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        console.log('err = ', action.payload);
        state.errors = action.payload;
      })

      .addCase(refreshToken.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.auth = action.payload;
        state.isLoading = false;
        state.isSignIn = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })
      ;
  },
});

export const {logout} = authSlice.actions;

export const authState = (state: RootState) => state.auth;
export default authSlice.reducer;
