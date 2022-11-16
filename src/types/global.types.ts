export type ApiKind =
  | 'loading'
  | 'ok'
  | 'bad-data'
  | 'not-found'
  | 'timeout'
  | 'cannot-connect'
  | 'server'
  | 'unauthorized'
  | 'forbidden'
  | 'rejected'
  | 'unknown';

  export interface IResponApi<T> {
    kind: ApiKind;
    data?: T;
  }

  export type IRegisterVerificationStep = 'selectMethod' | 'sendOtp' | 'inputOtp';

  export type IRegisterVerificationMethod = 'phone' | 'email' | 'wa';