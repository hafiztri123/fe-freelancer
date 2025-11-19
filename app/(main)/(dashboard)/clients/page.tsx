"use client";

import Button from "../../_components/button";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import CreateEditDialogue from "./_dialog/createEditClientDialogue";
import DataTable from "@/app/_components/datatable/dataTable";
import { Client } from "@/types/client.type";
import ClientService from "@/services/client.service";

export default function Clients() {
  const [isCreateClientVisible, setIsCreateClientVisible] =
    useState<boolean>(false);

  const fetchClients = async (): Promise<Client[]> => {
    try {
      const { data } = await ClientService.getClients();
      return data.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl">Clients</h1>
          <div>
            <Button
              label="Client"
              icon={IoIosAdd}
              severity="blue"
              onClick={() => setIsCreateClientVisible(true)}
            />
          </div>
        </div>

        <DataTable columns={[]} fetchData={fetchClients} />
      </div>

      <CreateEditDialogue
        isVisible={isCreateClientVisible}
        setVisible={setIsCreateClientVisible}
      />
    </>
  );
}
