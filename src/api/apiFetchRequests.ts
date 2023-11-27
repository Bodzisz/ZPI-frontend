import {
  checkResponseStatus,
  getApiUrl,
  getDefaultResponseHandler,
} from "./apiConfig";
import { Attraction, AttractionList } from "./interfaces/Attraction";
import { AttractionLocation } from "./interfaces/AttractionLocation";
import { AttracionPicture } from "./interfaces/AttractionPicture";
import { AttractionType } from "./interfaces/AttractionType";
import {
  AuthRequest,
  RegisterRequest,
  RegisterResponse,
} from "./interfaces/Auth";
import {
  CommentList,
  MyComment,
  NewMyComment,
  RatingList,
  NewRating,
} from "./interfaces/Comment";
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

export const fetchAttractionsByType = async (
  types: string[],
  page: number
): Promise<AttractionList> => {
  const typesString = types.join(",");
  return fetch(`${apiUrl}attractions/list?types=${typesString}&page=${page}`, {
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

export const fetchAttractionsType = async (
  query: string
): Promise<AttractionList> => {
  return fetch(`${apiUrl}attractions/list?cities=${query}`, {
    method: "GET",
  }).then(getDefaultResponseHandler);
};

export const fetchAttractionsTypes = async (): Promise<AttractionType[]> => {
  return fetch(`${apiUrl}attractions/types`, { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const fetchAttractionsCommentsByID = async (
  id: number
): Promise<CommentList> => {
  return fetch(`${apiUrl}comments/attraction/${id}`, { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const fetchAttractionsRatingsByID = async (
  id: number
): Promise<RatingList> => {
  return fetch(`${apiUrl}ratings/attraction/${id}`, { method: "GET" }).then(
    getDefaultResponseHandler
  );
};

export const deleteAttraction = async (
  id: number,
  token: string
): Promise<void> => {
  return fetch(`${apiUrl}attractions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    checkResponseStatus(res);
  });
};
export const deleteComment = async (
  id: number,
  user: User
): Promise<MyComment> => {
  const response = await fetch(`${apiUrl}comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(id),
  }).then(getDefaultResponseHandler);

  return response;
};

export const addAttractionComment = async (
  newComment: NewMyComment,
  user: User
): Promise<MyComment> => {
  const response = await fetch(`${apiUrl}comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(newComment),
  }).then(getDefaultResponseHandler);

  return response;
};

export const addAttractionRating = async (
  newRating: NewRating,
  user: User
): Promise<MyComment> => {
  const response = await fetch(`${apiUrl}ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(newRating),
  }).then(getDefaultResponseHandler);

  return response;
};
