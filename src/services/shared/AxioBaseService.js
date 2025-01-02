import axios from "axios";
import LocalStorageService from "./LocalStorageService";

const axiosClient = axios.create();
const baseURL = import.meta.env.VITE_API_URL;


axiosClient.defaults.baseURL = baseURL;

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.defaults.withCredentials = false;

axiosClient.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.get("token");
    if (token && config.url) {
      
        config.headers["Authorization"] = "Bearer " + token;
      
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




export function getRequest(url) {
  return axiosClient.get(`/${url}`).then((response) => response.data);
}

export function deleteRequest(url) {
  return axiosClient.delete(`/${url}`).then((response) => response);
}

export function putRequest(url, payload) {
  return axiosClient.put(`/${url}`, payload).then((response) => response);
}

export function postRequest(url, payload) {
  return axiosClient.post(`/${url}`, payload).then((response) => response.data);
}

export function postRequestWithFile(url, payload) {

  return axiosClient.put(`/${url}`, payload,{headers: { "Content-Type": "multipart/form-data" }}).then((response) => response.data);
}
