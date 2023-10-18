import { getApiUrl, getDefaultResponseHandler } from "./apiConfig";
import { Attraction } from "./interfaces/Attraction";
import { District } from "./interfaces/District";

const apiUrl = getApiUrl();

export const fetchAtrractions = async (): Promise<Attraction[]> => {
  return fetch(apiUrl + "attractions", { method: "GET" }).then(
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
