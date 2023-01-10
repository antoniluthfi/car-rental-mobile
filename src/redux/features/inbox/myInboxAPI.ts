import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponApi} from 'types/global.types';
import {apiWithInterceptor} from 'utils/interceptorV2';
import {showToast} from 'utils/Toast';

export const getInboxes = createAsyncThunk(
  'inbox/getInboxes',
  async (_, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/inboxes',
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

export const getInboxDetail = createAsyncThunk(
  'inbox/inbocDetail',
  async (id: number | string, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: `/api/inboxes/${id}`,
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
