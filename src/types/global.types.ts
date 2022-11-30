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

export type ICities = {
  id: number;
  name: string;
}

export type IFormDaily = {
  limit: number;
  passanger: number;
  price_sort: string;
  start_trip: string;
  start_booking_date: string;
  end_booking_date: string;
  end_trip: string;
  location: string;
  page: number;
  brand?: number;
  start_booking_time: string;
  end_booking_time: string;
  vehicle_id: number;
}

export type IGarages = {
  id: 34;
  name: string;
  address_details: string;
  start_time: string;
  end_time: string;
  map_link: string;
}

export type METHOD_PAYMENT = 'Manual Transfer' | 'Credit Card' | 'Virtual Account' | 'E-money';

export type IPayments = {
  id: number;
  method: METHOD_PAYMENT;
  description: string;
  created_at: string;
  updated_at: string;
  is_available: boolean;
  provider: string;
  code: string;
}

export type IUserProfile = {
  email: string;
  id: string;
  name: string;
  personal_info: {
    ktp: string;
    sim: string;
  },
  phone: string;
  phone_code: string;
  wa_number: string;
}

export type IUserData = {
  fullname: string;
  email: string;
  phone: string;
  code: string;
  wa: string;
  password: string;
  password_confirmation: string;
  registration_type: IRegisterVerificationMethod;
}