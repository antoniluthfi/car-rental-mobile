import { create } from 'apisauce';
import { URL_API } from "@env";
import store from 'redux/store';
import { refreshToken } from 'redux/features/auth/authAPI';
// const URL_API = 

export const apiWithInterceptor = create({
  baseURL: URL_API,

  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/json",
    // "X-Device-ID": "X-DEVICE-ID",
    // "X-Firebase-ID": "X-FIREBASE-ID",
    // "X-Firebase-Token": "X-FIREBASE-TOKEN",
    // "X-ENCRYPT-ID": "X-ENCRYPT-ID",
    // "Accept-Language": "Locale.getDefault().language",
    // "x-test-request": "test",
    // Connection: "close",
  },
  timeout: 60000,
});

apiWithInterceptor.addAsyncRequestTransform(request => async () => {
  request.baseURL = URL_API;
  const TOKEN = store.getState().auth.auth.access_token;
  console.log('TOKEN= . ', TOKEN);
  request.headers['Authorization'] = 'Bearer ' + TOKEN;
  console.log(URL_API + request.url)
});

apiWithInterceptor.addAsyncResponseTransform(response => async (res) => {
  // console.log('res int = ', JSON.stringify(res))
  //   if(response.config.url.includes("/api/v1.0/resetCache")){
  //     const deviceId = await DeviceId()
  //     await storage.save("DEVICE_ID", deviceId)
  //     applySnapshot(InterceporData, {deviceId: deviceId, token: ""})
  //   }
  if (res.status === 401 && res.problem === 'CLIENT_ERROR') {
    const refresh_token = store?.getState()?.auth?.auth.refresh_token;
    console.log('refresh_token ', refresh_token)
    let refresh = await store.dispatch(refreshToken(refresh_token!));
    // console.log('ss ', refresh);
    // return Axios.request(response.config!);
  }

  if (response.data != null) {
    return response.data;
  }
});
