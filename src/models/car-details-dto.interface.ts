export interface CarDetailsDto {
  registrationDate: string;
  mileage: number | null;
  currency: string;
  price: number | null;
  manufactureYear: number | null;
  availability: boolean;
  licensePlate: string;
}

export const DEFAULT_CAR_DETAIL: CarDetailsDto = {
  registrationDate: '',
  mileage: null,
  currency: '',
  price: null,
  manufactureYear: null,
  availability: false,
  licensePlate: '',
};
