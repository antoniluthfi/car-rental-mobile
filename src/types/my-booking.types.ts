export interface IMyBookingResult {
  data: any[];
  pagination: {
    limit: number;
    next_page: number;
    page: number;
    prev_page: number;
    total: number;
    total_page: number;
  };
}

export interface IParamVehicleOrder {
  id: number;
}

export type ORDER_STATUS = 'PENDING' | 'FAILED' | 'RECONFIRMATION';

export type IOrder = {
  booking_price: number;
  created_at: string;
  disbursement: {
    created_at: string;
    disbursement_confirmation_image: string;
    payment: {
      code: string;
      method: string;
    };
    payment_method_id: number;
    redirect_url: string;
    sender_bank_name: string;
    sender_name: string;
    updated_at: string;
    va_number: string;
    permata_va_number: string;
    bill_key: string;
  };
  email: string;
  expired_time: string;
  id: number;
  insurance_fee: number;
  order_detail: {
    start_booking_time: string;
    end_booking_date: string;
    end_booking_time: string;
    is_take_from_rental_office: boolean;
    rental_delivery_location: string;
    rental_return_office_id: number;
    special_request: string;
    start_booking_date: string;
    vehicle_id: number;
  };
  order_status: ORDER_STATUS;
  order_type_id: number;
  phone_number: string;
  rental_delivery_fee: number;
  service_fee: number;
  total_payment: number;
  transaction_key: string;
  updated_at: string;
  user_name: string;
  wa_number: string;
};
