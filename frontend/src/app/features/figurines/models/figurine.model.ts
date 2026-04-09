export interface Figurine {
  pk: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturerData: Manufacturer;
}

export interface CreateFigurineDto {
  name: string;
  description: string;
  manufacturer: string;
}

export interface Manufacturer {
  pk: string;
  name: string;
  description: string;
}
