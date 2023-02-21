import {createAsyncThunk} from '@reduxjs/toolkit';
import i18n from 'i18next';
import {IResponApi} from 'types/global.types';
import {apiWithInterceptor} from 'utils/interceptorV2';
import { showToast } from 'utils/Toast';

export const getAllGarages = createAsyncThunk(
  'search/getAllGarages',
  async (_, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/garages',
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || i18n.t('global.alert.error_occurred'),
        title: i18n.t('global.alert.warning'),
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
