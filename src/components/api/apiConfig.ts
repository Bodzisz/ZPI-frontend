import { useMockApi } from "../../../package.json";

export function getApiUrl() {
  if (useMockApi) {
    return import.meta.env.VITE_MOCK_API_URL;
  } else {
    return import.meta.env.VITE_API_URL;
  }
}

export const getDefaultResponseHandler = async (
  response: Response
): Promise<any> => {
  const status = response.status;
  if (status < 200 || status >= 300) {
    throw Error();
  }
  return response.json();
};
