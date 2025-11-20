"use client";

import Button from "../../_components/button";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import CreateEditDialogue from "./_dialog/createEditClientDialogue";
import DataTable from "@/app/_components/datatable/dataTable";
import { Client } from "@/types/client.type";
import ClientService from "@/services/client.service";
import { DataTableColumn, DataTableOption } from "@/app/_components/datatable";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
export default function Clients() {
  const currencySymbolMapping: Record<string, string> = {
    USD: "$",
    IDR: "Rp",
    JPY: "¥",
  };
  const columns: DataTableColumn[] = [
    {
      header: "Client Name",
      field: "name",
    },
    {
      header: "Email",
      field: "email",
    },
    {
      header: "Active Projects",
      field: "activeProjects",
      tableCellComponent: (data: Client) => {
        return <>{`${data.activeProjects} active`}</>;
      },
    },
    {
      header: "Total Revenue",
      field: "totalRevenue",
      tableCellComponent: (data: Client) => {
        return (
          <>{`${data.totalRevenue.amount} ${
            currencySymbolMapping[data.totalRevenue.currency]
          }`}</>
        );
      },
    },
    {
      header: "Outstanding",
      field: "outstanding",
      tableCellComponent: (data: Client) => {
        return (
          <>{`${data.outstanding.amount} ${
            currencySymbolMapping[data.outstanding.currency]
          }`}</>
        );
      },
    },
  ];

  const options: DataTableOption[] = [
    {
      label: "Edit",
      icon: MdEdit,
      onClick: (data: Client) => {
        console.log(data);
      },
    },
    {
      label: "Delete",
      icon: MdDelete,
      onClick: (data: Client) => {
        console.log(data);
      },
    },
    {
      label: "Detail",
      icon: BiSolidUserDetail,
      onClick: (data: Client) => {
        console.log(data);
      },
    },
  ];

  const [isCreateClientVisible, setIsCreateClientVisible] =
    useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

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

        <DataTable
          columns={columns}
          fetchData={fetchClients}
          options={options}
          refreshKey={refresh}
          useOptions
        />
      </div>

      <CreateEditDialogue
        isVisible={isCreateClientVisible}
        setVisible={setIsCreateClientVisible}
        refresh={() => setRefresh(refresh + 1)}
      />
    </>
  );
}
