import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import axios from 'axios';
import {
  IParamForgotPasswordRequest,
  IResultForgotPasswordRequest,
} from 'types/forgot-password.types';
import {IResponApi} from 'types/global.types';
import {apiWithInterceptor} from 'utils/interceptor';
import {showToast} from 'utils/Toast';

const URL = process.env.URL_API;

export const forgotPasswordRequest = createAsyncThunk(
  'forgotPassword/forgotPasswordRequest',
  async function (
    params: IParamForgotPasswordRequest,
    thunkAPI,
  ): Promise<IResponApi<IResultForgotPasswordRequest>> {
    try {
      const {email} = params;

      const response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/authorization/forgot-password/request`,
        {email},
      );

      if (!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data) as any;
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.slug) as any;
    }
  },
);

// export const forgotPasswordConfirmation = createAsyncThunk(
//   'forgotPassword/forgotPasswordConfirmation',
//   async (otp, thunkAPI) => {
//     const session = thunkAPI.getState().forgotPassword.data.session;
//     const data = {
//       token: otp,
//       session,
//     };

//     try {
//       const response = await axios.post(
//         `${URL}/api/authorization/forgot-password/confirmation`,
//         data,
//       );

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.slug);
//     }
//   },
// );

// export const forgotPasswordReset = createAsyncThunk(
//   'forgotPassword/forgotPasswordReset',
//   async (payload, thunkAPI) => {
//     const session = thunkAPI.getState().forgotPassword.data.session;
//     const data = {
//       password: payload.password,
//       password_confirmation: payload.passwordConfirm,
//       session,
//     };

//     try {
//       const response = await axios.post(
//         `${URL}/api/authorization/forgot-password`,
//         data,
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.slug);
//     }
//   },
// );
