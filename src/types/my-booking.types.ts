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
  id: number
}