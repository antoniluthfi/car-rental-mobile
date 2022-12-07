import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import axios from 'axios';
import {IResponApi} from 'types/global.types';
import {ParamChangePassword} from 'types/user';
import {apiWithInterceptor} from 'utils/interceptor';
import {showToast} from 'utils/Toast';

const url = process.env.URL_API;

// export const editUser = createAsyncThunk(
//   'user/editUser',
//   async (payload, thunkAPI) => {
//     const accessToken = thunkAPI.getState().auth.data.access_token;
//     const { name, photo_ktp, photo_license, password } = payload;

//     try {
//       const response = await axios
//         .put(
//           `${url}/api/profile`,
//           { name, photo_ktp, photo_license, password },
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         )
//         .then((res) => res);

//       thunkAPI.dispatch(getUser());
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const uploadFile = createAsyncThunk(
//   'user/uploadFile',
//   async (payload, thunkAPI) => {
//     const accessToken = thunkAPI.getState().auth.data.access_token;
//     const { file, name } = payload;

//     try {
//       const response = await axios
//         .post(
//           `${url}/api/profile/document`,
//           { file },
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         )
//         .then((res) => res);

//       return {
//         [name]: response.data?.file,
//       };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

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
