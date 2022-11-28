import {create} from 'apisauce';
import {URL_API} from '@env';
import {store} from 'redux/store';
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
  request.headers['Authorization'] = `Bearer ${
    store.getState().auth.auth.access_token
  }`;
});

apiWithInterceptor.addAsyncResponseTransform(response => async () => {
  //   if(response.config.url.includes("/api/v1.0/resetCache")){
  //     const deviceId = await DeviceId()
  //     await storage.save("DEVICE_ID", deviceId)
  //     applySnapshot(InterceporData, {deviceId: deviceId, token: ""})
  //   }

  if (response.data != null) {
    return response.data;
  }
});
