import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {IResponApi} from 'types/global.types';
import {apiWithInterceptor} from 'utils/interceptor';

export const getAllGarages = createAsyncThunk(
  'search/getAllGarages',
  async (_, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/garages`,
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
