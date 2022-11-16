import { getGeneralApiProblem } from '../../../models/api-problem';
import { apiWithInterceptor } from '../../../utils/interceptor';
// import * as Types from 'types/auth.types';
import { ApiResponse } from 'apisauce';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiKind, IResponApi } from 'types/global.types';
import { IParamLogin, IParamRegister, IResultLogin } from 'types/auth.types';
import { showToast } from 'utils/Toast';

export const authLogin = createAsyncThunk(
  'auth/login',
  async function (params: IParamLogin, thunkAPI)
  : Promise<IResponApi<IResultLogin> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/authorization`,
        { ...params, scope: 'app' }
      );
      if(!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
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


export const  authRegister = createAsyncThunk(
  'auth/register',
  async function (params: IParamRegister, thunkAPI)
  : Promise<IResponApi<IResultLogin> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/authorization/register`,
        { ...params }
      );
      console.log('respn = ', response.data);
      if(!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
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

export const  authRegisterConfirmation = createAsyncThunk(
  'auth/registerConfirmation',
  async function (params: IParamRegister, thunkAPI)
  : Promise<IResponApi<IResultLogin> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/authorization/register/confirmation`,
        { ...params }
      );
      if(!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
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