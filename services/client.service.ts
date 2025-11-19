import { AxiosResponse } from "axios";
import { createAxiosInstance } from "./axios";
import { CreateClientBody } from "./dto/client.dto";

const API = createAxiosInstance("/api/v1/clients");

const ClientService = {
  createClients: (body: CreateClientBody): Promise<AxiosResponse> => {
    return API.post("", body);
  },
};

export default ClientService;
