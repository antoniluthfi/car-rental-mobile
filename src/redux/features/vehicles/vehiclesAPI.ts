import { getGeneralApiProblem } from '../../../models/api-problem';
import { apiWithInterceptor } from '../../../utils/interceptor';
// import * as Types from 'types/auth.types';
import { ApiResponse } from 'apisauce';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiKind, ICities, IResponApi } from 'types/global.types';
import { IParamConfirmation, IParamLogin, IParamRegister, IResultLogin } from 'types/auth.types';
import { showToast } from 'utils/Toast';
import { IPaginationVehicle, IResponVehicles, IVehicles } from 'types/vehicles';

export const getVehicles = createAsyncThunk(
  'appData/getVehicles',
  async function (params: string, thunkAPI)
  : Promise<IResponApi<IResponVehicles> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/vehicles`+params,
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


export const getBrands = createAsyncThunk(
  'appData/getBrands',
  async function (params, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/brands`,
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

export const getVehiclesById = createAsyncThunk(
  'appData/getVehiclesById',
  async function (params: number, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/vehicles/${params}`,
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

