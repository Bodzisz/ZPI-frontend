export interface Attraction {
  id: number;
  title: string;
  type: string;
  description: string;
  picture: string;
  attractionType: string;
  district: string;
  city: string;
  postalCode: string;
  xcoordinate: number;
  ycoordinate: number;
}

export interface AttractionList {
  content: Attraction[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
}
