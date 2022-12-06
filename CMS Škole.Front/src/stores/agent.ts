import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:8081/api";

const responseBody = (response: AxiosResponse) =>
  response ? response.data : "";

export const requests = {
  get: (url: string, params?: any) => {
    return axios.get(url, params && params).then(responseBody);
  },
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
