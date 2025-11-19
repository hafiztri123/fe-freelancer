import { AxiosResponse } from "axios";
import { createAxiosInstance } from "./axios";
import { CreateClientBody } from "./dto/client.dto";
import { GenericResponseArray } from "@/types/response.type";
import { Client } from "@/types/client.type";

const API = createAxiosInstance("/api/v1/clients");

const ClientService = {
  createClients: (body: CreateClientBody): Promise<AxiosResponse> => {
    return API.post("", body);
  },
  getClients: (): Promise<AxiosResponse<GenericResponseArray<Client>>> => {
    return API.get("");
  },
};

export default ClientService;
