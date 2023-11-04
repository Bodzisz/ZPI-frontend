import { getApiUrl, getDefaultResponseHandler } from "./apiConfig";
import { Attraction, AttractionList } from "./interfaces/Attraction";
import { AttractionLocation } from "./interfaces/AttractionLocation";
import { AttracionPicture } from "./interfaces/AttractionPicture";
import { District } from "./interfaces/District";

const apiUrl = getApiUrl();

export const fetchAtrractions = async (): Promise<AttractionList> => {
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
