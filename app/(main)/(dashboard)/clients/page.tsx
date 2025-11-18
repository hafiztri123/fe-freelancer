"use client";

import Dialog from "@/app/_components/dialog";
import Button from "../../_components/button";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import CreateEditDialogue from "./_components/createEditClientDialogue";

export default function Clients() {
  const [isCreateClientVisible, setIsCreateClientVisible] =
    useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1>Clients</h1>
          <Button
            label="Client"
            icon={IoIosAdd}
            severity="blue"
            onClick={() => setIsCreateClientVisible(true)}
          />
        </div>
      </div>

      <CreateEditDialogue 
        isVisible={isCreateClientVisible}
        setVisible={setIsCreateClientVisible}
      />
    </>
  );
}
