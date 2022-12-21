import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {IResponApi} from 'types/global.types';
import {apiWithInterceptor} from 'utils/interceptor';
import {showToast} from 'utils/Toast';

export const getInboxes = createAsyncThunk(
  'inbox/getInboxes',
  async (_, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/inboxes`,
      );

      if (!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data) as any;
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getInboxDetail = createAsyncThunk(
  'inbox/inbocDetail',
  async (id: number | string, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/inboxes/${id}`,
      );

      if (!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data) as any;
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
