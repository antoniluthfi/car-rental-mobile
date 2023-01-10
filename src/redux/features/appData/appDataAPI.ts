import { apiWithInterceptor } from '../../../utils/interceptorV2';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICities, IResponApi } from 'types/global.types';
import { showToast } from 'utils/Toast';

export const getAllCities = createAsyncThunk(
  'appData/getAllCities',
  async function (params, thunkAPI)
  : Promise<IResponApi<ICities> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/cities',
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
  }
);

export const getUser = createAsyncThunk(
  'appData/getUser',
  async function (params, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/profile?includes=PersonalInfos',
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
  }
);

export const getGarages = createAsyncThunk(
  'appData/getGarages',
  async function (params, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/garages',
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
  }
);


export const getPayments = createAsyncThunk(
  'appData/getPayments',
  async function (params, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/payments',
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
  }
);
