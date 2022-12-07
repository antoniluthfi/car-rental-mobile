export type IOrderSummary = {
    booking_price: number;
    end_booking_date: string;
    end_booking_time: string;
    insurance_fee: number;
    order_type_id: number;
    rental_delivery_fee: number;
    service_fee: number;
    start_booking_date: string;
    start_booking_time: string;
    total_payment: number;
    vehicle_id: number;
}
export type IPayloadSummary = {
    order_type_id: number;
    end_booking_date: string;
    end_booking_time: string;
    start_booking_date: string;
    start_booking_time: string;
    vehicle_id: number;
}

export type IParamOrder = {
    order_type_id: number;
    user_name: string;
    phone_number: string;
    wa_number: string;
    email: string;
    booking_price: number;
    service_fee: number;
    rental_delivery_fee: number;
    insurance_fee: number;
    total_payment: number;
    order_detail: {
        vehicle_id: number;
        passenger_number: number;
        is_take_from_rental_office: boolean;
        rental_delivery_location: string;
        rental_return_office_id: number;
        special_request?: string;
        end_booking_date: string;
        end_booking_time: string;
        start_booking_date: string;
        start_booking_time: string;
    }
}

export type ORDER_STATUS = 'PENDING' | 'FAILED';

export type IOrder = {
    order_type_id: number;
    user_name: string;
    phone_number: string;
    wa_number: string;
    email: string;
    booking_price: number;
    service_fee: number;
    rental_delivery_fee: number;
    insurance_fee: number;
    total_payment: number;
    expired_time: string;
    customer_id: string;
    id: number;
    order_status: ORDER_STATUS;
    transaction_key: string;
    updated_at: string;
    order_detail: {
        vehicle_id: number;
        passenger_number: number;
        is_take_from_rental_office: boolean;
        rental_delivery_location: string;
        rental_return_office_id: number;
        special_request?: string;
        end_booking_date: string;
        end_booking_time: string;
        start_booking_date: string;
        start_booking_time: string;
    }
}

export type IDisbursements = {
    transaction_id: string;
    transaction_key: string;
    va_numbers: {
        bank: string;
        va_number: string
    }[],
    deep_link?: string;
    qr_code?: string;
}
