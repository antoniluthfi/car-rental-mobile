import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import {
  // forgotPasswordConfirmation,
  forgotPasswordRequest,
  // forgotPasswordReset,
} from './forgotPasswordAPI';

interface IInitState {
  data: {
    token: string;
    session: string;
  };
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: any;
}

const initialState: IInitState = {
  data: {
    token: "",
    session: ""
  },
  status: 'idle',
  error: null,
};

export const forgotPassword = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPasswordRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
        state.error = null;
      })
      // .addCase(forgotPasswordConfirmation.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(forgotPasswordConfirmation.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // })
      // .addCase(forgotPasswordConfirmation.fulfilled, (state) => {
      //   state.status = 'success';
      //   state.error = null;
      // })
      // .addCase(forgotPasswordReset.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(forgotPasswordReset.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // })
      // .addCase(forgotPasswordReset.fulfilled, (state, action) => {
      //   state.status = 'success';
      //   state.data = action.payload;
      //   state.error = null;
      // });
  },
});

export const forgotPasswordState = (state: RootState) => state.forgotPassword;
export default forgotPassword.reducer;
