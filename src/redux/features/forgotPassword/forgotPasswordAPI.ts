import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  IParamForgotPasswordRequest,
  IParamsResetPassword,
  IResultForgotPasswordRequest,
  IResultResetPassword,
} from 'types/forgot-password.types';
import {IResponApi} from 'types/global.types';
import {apiWithInterceptor} from 'utils/interceptorV2';
import {showToast} from 'utils/Toast';

export const forgotPasswordRequest = createAsyncThunk(
  'forgotPassword/forgotPasswordRequest',
  async function (
    params: IParamForgotPasswordRequest,
    thunkAPI,
  ): Promise<IResponApi<IResultForgotPasswordRequest>> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/authorization/forgot-password/request',
        data: params,
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
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

      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/authorization/forgot-password/confirmation',
        data: data,
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
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

      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/authorization/forgot-password',
        data: data,
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data.slug) as any;
    }
  },
);
