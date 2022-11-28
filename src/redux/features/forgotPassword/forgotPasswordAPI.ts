import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {
  IParamForgotPasswordRequest,
  IParamsResetPassword,
  IResultForgotPasswordRequest,
  IResultResetPassword,
} from 'types/forgot-password.types';
import {IResponApi} from 'types/global.types';
import {apiWithInterceptor} from 'utils/interceptor';
import {showToast} from 'utils/Toast';

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

export const forgotPasswordConfirmation = createAsyncThunk(
  'forgotPassword/forgotPasswordConfirmation',
  async (_, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const fpData = thunkAPI.getState().forgotPassword.data;

      const data = {
        token: fpData.token,
        session: fpData.session,
      };

      const response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/authorization/forgot-password/confirmation`,
        data,
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
      return thunkAPI.rejectWithValue(error.response.data.slug);
    }
  },
);

export const forgotPasswordReset = createAsyncThunk(
  'forgotPassword/forgotPasswordReset',
  async (
    payload: IParamsResetPassword,
    thunkAPI: any,
  ): Promise<IResponApi<IResultResetPassword>> => {
    try {
      const session = thunkAPI.getState().forgotPassword.data.session;

      const data = {
        password: payload.password,
        password_confirmation: payload.password_confirmation,
        session,
      };

      const response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/authorization/forgot-password`,
        data,
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
