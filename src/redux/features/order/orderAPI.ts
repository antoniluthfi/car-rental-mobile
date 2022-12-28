import { apiWithInterceptor } from '../../../utils/interceptor';
// import * as Types from 'types/auth.types';
import { ApiResponse } from 'apisauce';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponApi } from 'types/global.types';
import { showToast } from 'utils/Toast';
import { IResponVehicles } from 'types/vehicles';
import { IParamOrder } from 'types/order';

export const getSummaryOrder = createAsyncThunk(
  'appData/getSummaryOrder',
  async function (
    params: string,
    thunkAPI,
  ): Promise<IResponApi<IResponVehicles> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/orders/summary` + params,
      );

      if (!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createOrder = createAsyncThunk(
  'appData/createOrder',
  async function (
    params: IParamOrder,
    thunkAPI,
  ): Promise<IResponApi<any> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/orders`,
        { ...params },
      );

      if (!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data);
      }

      console.log('create order', response.data)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const postDisbursements = createAsyncThunk(
  'order/postDisbursements',
  async (payload: any = {}, thunkAPI: any): Promise<IResponApi<any> | any> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/disbursements`,
        payload,
      );

      console.log('payload', payload);
      if (!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createDisbursements = createAsyncThunk(
  'appData/createDisbursements',
  async function (params: {
    payment_type_id: number;
    transaction_key: string;
    card_token_id?: string;
    card_owner_name?: string;
  }, thunkAPI)
    : Promise<IResponApi<any> | any> {
    try {
      console.log('params = ', params)
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/disbursements`,
        { ...params },
      );
      if (!response.ok) {
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


export const cancelOrder = createAsyncThunk(
  'cancel/cancelOrder',
  async function (params: {
    "name": string;
    "bank": string;
    "bank_account_number": string;
    "cancelation_reason": string;
    transaction_key: string;
  }, thunkAPI)
    : Promise<IResponApi<any> | any> {
    try {
      console.log('params = ', params)
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/orders/${params?.transaction_key}/cancel`,
        {
          "name": params.name,
          "bank": params.bank || 'Mandiri',
          "bank_account_number": params.bank_account_number,
          "cancelation_reason": params.cancelation_reason
        },
      );
      console.log('cancel = ', JSON.stringify(response));
      if (!response.ok) {
        showToast({
          message: response?.data?.slug || 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        })
        return thunkAPI.rejectWithValue(response.data);
      }
      console.log('cancel = ', response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

