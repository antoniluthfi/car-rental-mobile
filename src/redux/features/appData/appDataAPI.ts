import { getGeneralApiProblem } from '../../../models/api-problem';
import { apiWithInterceptor } from '../../../utils/interceptor';
// import * as Types from 'types/auth.types';
import { ApiResponse } from 'apisauce';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiKind, ICities, IResponApi } from 'types/global.types';
import { IParamConfirmation, IParamLogin, IParamRegister, IResultLogin } from 'types/auth.types';
import { showToast } from 'utils/Toast';

export const getAllCities = createAsyncThunk(
  'appData/getAllCities',
  async function (params, thunkAPI)
  : Promise<IResponApi<ICities> | any> {
    try {
      let response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/cities`,
      );
      // console.log(response.data)
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
