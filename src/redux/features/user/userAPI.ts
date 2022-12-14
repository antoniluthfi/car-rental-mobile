import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {IResponApi} from 'types/global.types';
import {ParamChangePassword, ParamEditUser, ParamUploadFile} from 'types/user';
import {apiWithInterceptor} from 'utils/interceptor';
import {showToast} from 'utils/Toast';

export const editUser = createAsyncThunk(
  'user/editUser',
  async (payload: ParamEditUser, thunkAPI: any) => {
    try {
      const response = await apiWithInterceptor
        .put(`/api/profile`, payload)
        .then(res => res);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const uploadFile = createAsyncThunk(
  'user/uploadFile',
  async (payload: ParamUploadFile, thunkAPI: any) => {
    const {file, name} = payload;

    try {
      const response: ApiResponse<any> = await apiWithInterceptor.post(
        `/api/profile/document`,
        {file},
      );

      return {
        [name]: response.data?.file,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (
    payload: ParamChangePassword,
    thunkAPI: any,
  ): Promise<IResponApi<any> | any> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.put(
        `/api/authorization/change-password`,
        {
          ...payload,
        },
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
