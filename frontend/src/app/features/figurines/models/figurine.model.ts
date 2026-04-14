import { Manufacturer } from '../../manufacturer/models/manufacturer.model';

export interface Figurine {
  pk: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturerData?: Manufacturer;
}

export interface CreateFigurineDto {
  name: string;
  description: string;
  manufacturer: string;
  photos?: File[];
  cover_photo?: File;
}
