import axios, { AxiosInstance } from "axios";

export const createAxiosInstance = (url: string = "", params: Record<string, string> = {}): AxiosInstance => {

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    const FULL_URL = `${BASE_URL}${url}`

    const axiosInstance =  axios.create({
        baseURL: FULL_URL,
        headers: {
            "Content-Type": "application/json",
        },
        params

    },)


    axiosInstance.interceptors.request.use((req) => {
        const token = localStorage.getItem("token");
        if (token && req.headers) {
            req.headers.authorization = `Bearer ${token}`
        }
        return req
    }, (err) => {
        return Promise.reject(err)
    })

    return axiosInstance
}