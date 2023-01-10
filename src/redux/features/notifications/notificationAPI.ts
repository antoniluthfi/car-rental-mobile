import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWithInterceptor} from 'utils/interceptorV2';
import {IResponApi} from 'types/global.types';
import { NotificationDataResult } from 'types/notification';
import { showToast } from 'utils/Toast';

export const getNotificationSettings = createAsyncThunk(
  'notifications/getSettings',
  async (_, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/settings/notifications',
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  },
);

export const updateNotificationSettings = createAsyncThunk(
  'notifications/updateSettings',
  async (payload: NotificationDataResult[], thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: any = await apiWithInterceptor({
        method: 'put',
        url: '/api/settings/notifications',
        data: {
          settings: payload,
        }
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  },
);
