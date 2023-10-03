"use client";

import React, { useState } from "react";
import Burger from "/public/assets/Burger.svg";
import GoldenText from "/public/assets/logoText.svg";
import ArcherVector from "/public/assets/archer.svg";
import Tool from "/public/assets/Tool.svg";
import Vector from "/public/assets/Vector.svg";
import LogOut from "/public/assets/logOut.svg";
import Setting from "/public/assets/setting.svg";
import Link from "next/link";
import GoldenLogo from "/public/assets/goldenPath.svg";
import useDetectClickOut from "@/app/hooks/useDetectClickOut";

export default function Drawer() {
  const { show, nodeRef, triggerRef } = useDetectClickOut(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  return (
    <div>
      <div className="lg:hidden relative">
        <div className="absolute right-6 top-6" ref={triggerRef}>
          <Burger />
        </div>
        <div className="flex justify-center pt-[2.1rem]">
          <GoldenText />
        </div>
      </div>

      <div
        className={`top-0 right-0 w-[80vw] sm:w-[40vw] md:w-[40vw] lg:hidden bg-drawerColor backdrop-blur-lg	 p-10  text-white fixed h-full z-40  ease-in-out duration-300 ${
          show ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div ref={nodeRef}>
          <div className="flex justify-center mb-[7.4rem]">
            <GoldenLogo />
          </div>{" "}
          <Link
            href={"/lifeGoals"}
            className="flex mb-[4.3rem] items-center cursor-pointer text-white  text-3xl md:pl-[3.8rem] md:mb-[4rem]"
          >
            <div className="mr-[1.7rem]">
              <Vector />
            </div>
            Life Goals
          </Link>
          <Link
            href={"/yearlyGoals"}
            className="flex mb-[4.3rem] items-center cursor-pointer text-white  text-3xl md:pl-[3.8rem] md:mb-[4rem]"
          >
            <div className="mr-[1.7rem]">
              <ArcherVector />
            </div>
            Yearly Goals
          </Link>{" "}
          <Link
            href={"/aboutUs"}
            className="flex mb-[4.3rem] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] "
          >
            <div className="mr-[1.7rem]">
              <Tool />
            </div>
            productivity tool
          </Link>
          <div className="absolute bottom-[6.4rem] left-0 right-0">
            <div
              className={`bg-Crayola  rounded-[1.4rem] w-4/5 m-auto cursor-pointer mb-[1.6rem]`}
            >
              <div className="pt-[1.2rem] pb-[1.2rem] pr-[2.8rem] pl-[2.8rem] flex items-center">
                <Setting />
                <p className="ml-[1.5rem] text-2xl text-white">Settings</p>
              </div>
            </div>
            <div className="bg-Crayola  rounded-[1.4rem] w-4/5 m-auto cursor-pointer">
              <div className="pt-[1.2rem] pb-[1.2rem] pr-[2.8rem] pl-[2.8rem] flex items-center">
                <LogOut />
                <p className="ml-[1.5rem] text-2xl text-white">logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
