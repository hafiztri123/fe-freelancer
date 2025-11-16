"use client";

import { JSX } from "react";

import { FaRegFolder } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoAnalytics } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaBoltLightning } from "react-icons/fa6";

import logo from "@/assets/logo-only.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function Sidebar(): JSX.Element {
  const isLogin = usePathname().includes("/login");

  const headerMapping: Record<string, string> = {
    login: "Manage Your Freelance Business",
    register: "Start Managing Your Career",
  };

  const subHeaderMapping: Record<string, string> = {
    login:
      "Track projects, send invoices, and get paid faster. Everything \nyou need to run your freelance business in one place.",
    register:
      "Join thousands of freelancers who trust ProjectQ.ID \nto manage their business. Get started in less than 2 minutes.",
  };

  const featureMapping: Record<string, { label: string; icon: IconType }[]> = {
    login: [
      {
        label: "Project & milestone tracking",
        icon: FaRegFolder,
      },
      {
        label: "Professional invoice generation",
        icon: LiaFileInvoiceDollarSolid,
      },
      {
        label: "Revenue analytics & reporting",
        icon: IoAnalytics,
      },
      {
        label: "Payment tracking & reminders",
        icon: FaRegMoneyBillAlt,
      },
    ],
    register: [
      {
        label: "Free 14-day trial, no credit card required",
        icon: FaCheck,
      },
      {
        label: "Set up in under 5 minutes",
        icon: FaBoltLightning,
      },
      {
        label: "Bank-level security for your data",
        icon: FaLock,
      },
      {
        label: "24/7 customer support",
        icon: IoChatboxEllipsesOutline,
      },
    ],
  };

  return (
    <>
      <div className="flex-1 bg-purple-400 p-10 flex items-center justify-center flex-col">
        <div className="flex gap-4">
          <Image src={logo} alt="logo" width={64} height={64} />
          <h1 className="text-[36px] font-bold text-white">ProjectQ.ID</h1>
        </div>

        <span className="font-semibold text-white text-[28px] mt-7.5">
          {headerMapping[isLogin ? "login" : "register"]}
        </span>

        <span className="text-center mt-5 text-white whitespace-pre-line">
            {subHeaderMapping[isLogin ? "login" : "register"]}
        </span>

        <div className="flex flex-col gap-5 mt-10 items-center justify-center">
          {featureMapping[isLogin ? "login" : "register"].map(
            (feature, index) => (
              <div
                key={index}
                className="flex gap-[15px] items-center justify-start w-full max-w-md"
              >
                <div className="rounded-full p-2 bg-purple-100/20 w-10 h-10 flex items-center justify-center shrink-0">
                  <feature.icon className="text-white w-6 h-6" />
                </div>

                <span className="text-white">{feature.label}</span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
