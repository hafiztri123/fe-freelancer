import axios, { AxiosError, AxiosInstance } from "axios";

export const createAxiosInstance = (
  url: string = "",
  params: Record<string, string> = {}
): AxiosInstance => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const FULL_URL = `${BASE_URL}${url}`;

  const axiosInstance = axios.create({
    baseURL: FULL_URL,
    headers: {
      "Content-Type": "application/json",
    },
    params,
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          const currentPath = window.location.pathname;
          if (currentPath !== "/login" && currentPath !== "/register") {
            window.location.href = "/login";
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
