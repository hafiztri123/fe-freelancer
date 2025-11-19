import { AxiosResponse } from "axios";
import { LoginBody, RegisterBody } from "./dto/auth.dto";
import { GenericResponse } from "@/types/response.type";
import { LoginResponse } from "@/types/auth.type";
import { createAxiosInstance } from "./axios";

const API = createAxiosInstance("/api/v1/auth");

const AuthService = {
  login: (
    body: LoginBody
  ): Promise<AxiosResponse<GenericResponse<LoginResponse>>> => {
    return API.post("/login", body);
  },

  register: (
    body: RegisterBody
  ): Promise<AxiosResponse<GenericResponse<LoginResponse>>> => {
    return API.post("/register", body);
  },

  logout: (): Promise<AxiosResponse> => {
    return API.post("/logout");
  }
};

export default AuthService;


