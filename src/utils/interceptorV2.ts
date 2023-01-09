import {create, ApisauceConfig} from 'apisauce';
import {URL_API} from '@env';
import store from 'redux/store';
import {refreshToken} from 'redux/features/auth/authAPI';

type ApiConfig = {
  method: ApisauceConfig['method'];
  url: ApisauceConfig['url'];
  data?: ApisauceConfig['data'];
};

export const apiWithInterceptor = async (config: ApiConfig) => {
  const api = create({} as any);

  api.axiosInstance.interceptors.request.use(
    request => {
      try {
        const TOKEN = store.getState().auth.auth.access_token;
        request.baseURL = URL_API;
        request.headers.Authorization = 'Bearer ' + TOKEN;
        request.timeout = 10000;
        return request;
      } catch (error) {}
    },
    error => {
      return Promise.reject(error);
    },
  );

  api.axiosInstance.interceptors.response.use(
    function (successRes) {
      return successRes;
    },
    function (error) {
      try {
        console.log('error', error.config.url);
        console.log(error.response.status);

        if (error.response.status === 401) {
          const refresh_token = store?.getState()?.auth?.auth.refresh_token;
          store.dispatch(refreshToken(refresh_token as any));
          return api.axiosInstance.request(error.config);
        }
        return Promise.reject(error);
      } catch (e) {}
    },
  );

  const res = await api.axiosInstance.request(config);

  return res;
};
