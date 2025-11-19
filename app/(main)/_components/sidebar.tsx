"use client";
import React, { JSX, useState } from "react";
import logo from "@/assets/logo-only.svg";
import Image from "next/image";
import { FaHome, FaFolder, FaFileInvoice } from "react-icons/fa";
import { IconType } from "react-icons";
import { IoPeopleSharp } from "react-icons/io5";
import { IoAnalytics } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { IoIosExit } from "react-icons/io";
import Dialog from "../../_components/dialog/dialog";
import Button from "./button";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
export default function Sidebar(): JSX.Element {
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false);

  const sidebarMapping: {
    name: string;
    icon: IconType;
    onClick: (i: number) => void;
  }[] = [
    {
      name: "Home",
      icon: FaHome,
      onClick: (index: number) => {
        setTabIndex(index);
        router.push("/home");
      },
    },
    {
      name: "Projects",
      icon: FaFolder,
      onClick: (index: number) => {
        setTabIndex(index);
        router.push("/projects");
      },
    },
    {
      name: "Clients",
      icon: IoPeopleSharp,
      onClick: (index: number) => {
        setTabIndex(index);
        router.push("/clients");
      },
    },
    {
      name: "Invoices",
      icon: FaFileInvoice,
      onClick: (index: number) => {
        setTabIndex(index);
        router.push("/invoices");
      },
    },
    {
      name: "Analytics",
      icon: IoAnalytics,
      onClick: (index: number) => {
        setTabIndex(index);
        router.push("/analytics");
      },
    },
    {
      name: "Settings",
      icon: IoIosSettings,
      onClick: (index: number) => {
        setTabIndex(index);
        router.push("/settings");
      },
    },
  ];

  const handleLogout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      router.push("/login");
    } catch (error) {
      console.error(error);
      router.push("/login");
    }
  };

  return (
    <>
      <div className="min-w-60 min-h-screen bg-[#2c3e50] flex flex-col">
        <div className="p-5 flex items-center justify-start text-white text-[20px] font-bold border-b border-b-gray-600 gap-2">
          <Image src={logo} alt="logo" width={28} height={28} />
          ProjectQ.ID
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            {sidebarMapping &&
              sidebarMapping.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-start gap-2 ${
                      tabIndex !== index && "hover:bg-navy-600"
                    } pl-6 py-4 hover:cursor-pointer ${
                      tabIndex === index &&
                      "border-l-4 border-l-navy-400 bg-navy-600"
                    } select-none`}
                    onClick={() => item.onClick(index)}
                  >
                    <item.icon className="text-white" size={16} />
                    <span className="text-white">{item.name}</span>
                  </div>
                );
              })}
          </div>

          <div
            className="flex items-center justify-start gap-2 pl-6 py-4 hover:cursor-pointer hover:bg-red-600 select-none"
            onClick={() => setIsLogoutVisible(true)}
          >
            <IoIosExit className="text-white" size={16} />
            <span className="text-white">Logout</span>
          </div>
        </div>
      </div>

      {isLogoutVisible && (
        <Dialog
          header="Log Out"
          isVisible={isLogoutVisible}
          default={
            <>
              <span className="flex justify-center items-center">
                Are you sure you want to log out?
              </span>
            </>
          }
          setVisible={(isVisible: boolean) => setIsLogoutVisible(isVisible)}
          footer={
            <div className="flex gap-4 items-center justify-center mt-4">
              <Button
                label="Cancel"
                severity="dark"
                onClick={() => setIsLogoutVisible(false)}
              />
              <Button
                label="Log Out"
                severity="danger"
                onClick={handleLogout}
              />
            </div>
          }
        />
      )}
    </>
  );
}
