export type IVehicles = {
    brand_name: string;
    disablility_allowed: boolean;
    id: number;
    license_number: string;
    max_passanger: number;
    max_suitcase: number;
    name: string;
    pet_allowed: boolean;
    photo: { id: number; name: string }[];
    price: number;
    smoke_allowed: boolean;
    status: string;
    year: number;
}
export type IPaginationVehicle = {
    last_page: number;
    limit: number;
    page: number;
    sort: 'string';
    total_data: number;
}
export type IResponVehicles = {
    pagination: IPaginationVehicle;
    vehicles: IVehicles[]
}
export type IBrands = { id: number; name: string; }
