import { CreateCarDto } from './create-car-dto.interface';

export interface Car extends CreateCarDto {
  id: string;
  total: number;
}
