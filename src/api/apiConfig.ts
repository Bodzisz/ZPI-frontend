import { useMockApi } from "../../package.json";
import { FetchError } from "./interfaces/FetchError";

export function getApiUrl() {
  if (useMockApi) {
    return import.meta.env.VITE_MOCK_API_URL;
  } else {
    return import.meta.env.VITE_API_URL;
  }
}

export const checkResponseStatus = (response: Response): void => {
  const status = response.status;
  if (status < 200 || status >= 300) {
    const error: FetchError = { status: status };
    throw error;
  }
};

export const getDefaultResponseHandler = async (
  response: Response
): Promise<any> => {
  const status = response.status;
  if (status < 200 || status >= 300) {
    const error: FetchError = { status: status };
    throw error;
  }
  // checkResponseStatus(response);
  return response.json();
};
