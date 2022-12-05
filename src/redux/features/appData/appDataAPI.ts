import { apiWithInterceptor } from '../../../utils/interceptor';
// import * as Types from 'types/auth.types';
import { ApiResponse } from 'apisauce';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICities, IResponApi } from 'types/global.types';
import { showToast } from 'utils/Toast';

export const getAllCities = createAsyncThunk(
  'appData/getAllCities',
  async function (params, thunkAPI)
  : Promise<IResponApi<ICities> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/cities`,
      );

      if(!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        })
        return thunkAPI.rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'appData/getUser',
  async function (params, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/profile?includes=PersonalInfos`,
      );

      if(!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        })
        return thunkAPI.rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getGarages = createAsyncThunk(
  'appData/getGarages',
  async function (params, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/garages`,
      );

      if(!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        })
        return thunkAPI.rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getPayments = createAsyncThunk(
  'appData/getPayments',
  async function (params, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/payments`,
      );

      if(!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        })
        return thunkAPI.rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
