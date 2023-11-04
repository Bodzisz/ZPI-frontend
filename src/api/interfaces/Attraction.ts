import { AttractionType } from "./AttractionType";
import { City } from "./City";
import { District } from "./District";

export interface Attraction {
  id: number;
  title: string;
  type: string;
  description: string;
  picture: string;
  attractionType: AttractionType;
  district: District;
  city: City;
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
