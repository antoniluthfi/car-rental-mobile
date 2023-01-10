import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponApi} from 'types/global.types';
import {ParamChangePassword, ParamEditUser, ParamUploadFile} from 'types/user';
import {apiWithInterceptor} from 'utils/interceptorV2';
import {showToast} from 'utils/Toast';

export const editUser = createAsyncThunk(
  'user/editUser',
  async (
    payload: ParamEditUser,
    thunkAPI: any,
  ): Promise<IResponApi<any> | any> => {
    try {
      const response: any = await apiWithInterceptor({
        method: 'put',
        url: '/api/profile',
        data: payload
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

export const uploadFile = createAsyncThunk(
  'user/uploadFile',
  async (
    payload: ParamUploadFile,
    thunkAPI: any,
  ): Promise<IResponApi<any> | any> => {
    const {file, name} = payload;

    try {
      const form = new FormData();
      form.append('file', {
        name: `${name}.${file.fileName?.split('.')?.[1]}`,
        uri: file.uri,
        type: file.type,
      });

      const response: any = await apiWithInterceptor({
        method: 'post',
        url: '/api/profile/document',
        data: form
      });

      return {
        [name]: response.data?.file,
      };
    } catch (error: any) {
      console.log(error);
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
      const response: any = await apiWithInterceptor({
        method: 'put',
        url: '/api/authorization/change-password',
        data: payload
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
