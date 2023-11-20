import { getApiUrl, getDefaultResponseHandler } from "./apiConfig";
import { Attraction, AttractionList } from "./interfaces/Attraction";
import { AttractionLocation } from "./interfaces/AttractionLocation";
import { AttracionPicture } from "./interfaces/AttractionPicture";
import {
  AuthRequest,
  RegisterRequest,
  RegisterResponse,
} from "./interfaces/Auth";
import { District } from "./interfaces/District";
import { NewAttraction } from "./interfaces/NewAttraction";
import { User } from "./interfaces/User";

const apiUrl = getApiUrl();

export const fetchAtrractionsByPage = async (
  page: number
): Promise<AttractionList> => {
  return fetch(`${apiUrl}attractions?page=${page}`, { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const fetchAtrractionById = async (id: number): Promise<Attraction> => {
  return fetch(`${apiUrl}attractions/${id}`, { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const fetchDistricts = async (): Promise<District[]> => {
  return fetch(apiUrl + "districts", { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const fetchDistanceFromUser = async (
  id: number,
  xCoordinate: number,
  yCoordinate: number
): Promise<number> => {
  const url = `${apiUrl}attractions/${id}/distance?xCoordinate=${xCoordinate}&yCoordinate=${yCoordinate}`;
  return fetch(url, { method: "GET" }).then(getDefaultResponseHandler);
};

export const fetchAttractionsLocations = async (): Promise<
  AttractionLocation[]
> => {
  return fetch(apiUrl + "attractions/locations", { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const fetchAttractionPicture = async (
  id: number
): Promise<AttracionPicture> => {
  return fetch(`${apiUrl}attractions/${id}/picture`, { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const authenticate = async (authRequest: AuthRequest): Promise<User> => {
  return fetch(`${apiUrl}auth/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authRequest),
  }).then(getDefaultResponseHandler);
};

export const register = async (
  registerReq: RegisterRequest
): Promise<RegisterResponse> => {
  return fetch(`${apiUrl}users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerReq),
  }).then(getDefaultResponseHandler);
};
//http://localhost:8080/api/v1/attractions/list?types=Przyroda,Zabytki&districts=milicki&cities=Łąki

export const fetchAttractionsByName = async (
  query: string
): Promise<AttractionList> => {
  return fetch(`${apiUrl}attractions/list?titles=${query}`, {
    method: "GET",
  }).then(getDefaultResponseHandler);
};

export const fetchAttractionsByCity = async (
  query: string
): Promise<AttractionList> => {
  return fetch(`${apiUrl}attractions/list?cities=${query}`, {
    method: "GET",
  }).then(getDefaultResponseHandler);
};

export const addAttraction = async (
  newAttraction: NewAttraction,
  user: User
): Promise<Attraction> => {
  return fetch(`${apiUrl}attractions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(newAttraction),
  }).then(getDefaultResponseHandler);
};
