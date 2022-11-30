import { getGeneralApiProblem } from '../../../models/api-problem';
import { apiWithInterceptor } from '../../../utils/interceptor';
// import * as Types from 'types/auth.types';
import { ApiResponse } from 'apisauce';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiKind, ICities, IResponApi } from 'types/global.types';
import { IParamConfirmation, IParamLogin, IParamRegister, IResultLogin } from 'types/auth.types';
import { showToast } from 'utils/Toast';
import { IPaginationVehicle, IResponVehicles, IVehicles } from 'types/vehicles';
import { IParamOrder } from 'types/order';

export const getSummaryOrder = createAsyncThunk(
  'appData/getSummaryOrder',
  async function (params: string, thunkAPI)
  : Promise<IResponApi<IResponVehicles> | any> {
    try {
      console.log('params = ', params)
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/orders/summary`+params,
      );
      console.log(response.data)
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

export const createOrder = createAsyncThunk(
  'appData/createOrder',
  async function (params: IParamOrder, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      console.log('params = ', params)
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/orders`,
        {...params},
      );
      console.log(response.data)
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


export const createDisbursements = createAsyncThunk(
  'appData/createDisbursements',
  async function (params: {
    payment_type_id: number;
    transaction_key: string;
  }, thunkAPI)
  : Promise<IResponApi<any> | any> {
    try {
      console.log('params = ', params)
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/disbursements`,
        {...params},
      );
      console.log(response.data)
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

