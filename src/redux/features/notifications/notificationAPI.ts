import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiWithInterceptor} from 'utils/interceptor';
import {IResponApi} from 'types/global.types';
import {ApiResponse} from 'apisauce';
import { NotificationDataResult } from 'types/notification';
import { showToast } from 'utils/Toast';

export const getNotificationSettings = createAsyncThunk(
  'notifications/getSettings',
  async (_, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/settings/notifications`,
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
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  },
);

export const updateNotificationSettings = createAsyncThunk(
  'notifications/updateSettings',
  async (payload: NotificationDataResult[], thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.put(
        `/api/settings/notifications`,
        {
          settings: payload,
        },
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
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  },
);
