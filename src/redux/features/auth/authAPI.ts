import {apiWithInterceptor} from '../../../utils/interceptorV2';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponApi} from 'types/global.types';
import {
  IParamConfirmation,
  IParamLogin,
  IParamRegister,
  IResultLogin,
} from 'types/auth.types';
import {showToast} from 'utils/Toast';

export const authLogin = createAsyncThunk(
  'auth/login',
  async function (
    params: IParamLogin,
    thunkAPI,
  ): Promise<IResponApi<IResultLogin> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/authorization',
        data: {...params, scope: 'app'},
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const authRegister = createAsyncThunk(
  'auth/register',
  async function (
    params: IParamRegister,
    thunkAPI,
  ): Promise<IResponApi<IResultLogin> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/authorization/register',
        data: {...params},
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const authRegisterConfirmation = createAsyncThunk(
  'auth/registerConfirmation',
  async function (
    params: IParamConfirmation,
    thunkAPI,
  ): Promise<IResponApi<any> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/authorization/register/confirmation',
        data: {...params},
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async function (params: string, thunkAPI): Promise<IResponApi<any> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/authorization/refresh',
        data: {refresh_token: params},
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
