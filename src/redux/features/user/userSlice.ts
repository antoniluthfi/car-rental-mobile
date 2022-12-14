import {createSlice} from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import {changePassword, editUser, uploadFile} from './userAPI';

type InitState = {
  data: any;
  isLoading: boolean;
  isUpdateSuccess: boolean;
  isChangePasswordSuccess: boolean;
  isError: boolean;
  errorResponse: any
}

const initialState: InitState = {
  data: {},
  isLoading: false,
  isUpdateSuccess: false,
  isChangePasswordSuccess: false,
  isError: false,
  errorResponse: {}, // kalo retry setelah error, harus hapus errorMessage dan isError!
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(editUser.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.errorResponse = {};
        state.isUpdateSuccess = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorResponse = action.payload;
        state.isUpdateSuccess = false;
      })
      .addCase(editUser.fulfilled, state => {
        state.isLoading = false;
        state.isUpdateSuccess = true;
      })
      .addCase(uploadFile.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.errorResponse = {};
        state.isUpdateSuccess = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorResponse = action.payload;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          ...state.data,
          ...action.payload,
        } as any;
      })
      .addCase(changePassword.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.errorResponse = {};
        state.isChangePasswordSuccess = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorResponse = action.payload as any;
      })
      .addCase(changePassword.fulfilled, state => {
        state.isLoading = false;
        state.isChangePasswordSuccess = true;
      });
  },
});

export const {resetUser} = user.actions;

export const userState = (state: RootState) => state.user;
export default user.reducer;
