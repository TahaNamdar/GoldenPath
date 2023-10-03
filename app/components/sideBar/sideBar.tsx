"use client";

import { usePathname } from "next/navigation";
import useDetectClickOut from "@/app/hooks/useDetectClickOut";

import GoldenLogo from "/public/assets/goldenPath.svg";
import Burger from "/public/assets/Burger.svg";
import GoldenText from "/public/assets/logoText.svg";
import ArcherVector from "/public/assets/archer.svg";
import Tool from "/public/assets/Tool.svg";
import Vector from "/public/assets/Vector.svg";
import LogOut from "/public/assets/logOut.svg";
import Setting from "/public/assets/setting.svg";
import Link from "next/link";

export default function SideBar({ sideBarName }: { sideBarName: string }) {
  const pathname = usePathname();

  const { show, nodeRef, triggerRef } = useDetectClickOut(false);

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
            <div className="bg-Crayola  rounded-[1.4rem] w-4/5 m-auto cursor-pointer mb-[1.6rem]">
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
      {/* //end drawer */}
      <div className="hidden lg:block md:h-screen md:w-[28.6rem] bg-darkGunmetal relative">
        <div className="md:ml-[10rem] md:mr-[12.1rem] md:mt-[4.5rem] md:mb-[6.7rem]">
          <GoldenLogo />
        </div>
        <div className="flex flex-col justify-between ">
          <div className=" mx-auto max-w-lg md:mr-[1.2rem] md:ml-[1.6rem]  ">
            <div>
              <Link
                href={"/lifeGoals"}
                className="flex ml-[-5.6rem] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem] "
              >
                <div className="md:mr-[1.5rem] ml-[2.4rem]">
                  <Vector />
                </div>
                Life Goals
              </Link>

              <Link
                href={"/yearlyGoals"}
                className="flex ml-[-5.6rem] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem]"
              >
                <div className="md:mr-[1.5rem] ml-[2.4rem]">
                  <ArcherVector />
                </div>
                Yearly Goals
              </Link>

              <Link
                href={"/aboutUs"}
                className="flex ml-[-5.6rem] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] "
              >
                <div className="md:mr-[1.5rem] ml-[2.4rem]">
                  <Tool />
                </div>
                productivity tool
              </Link>
            </div>
          </div>

          {/* buttons section */}
          <div className="md:absolute md:bottom-[6.4rem] md:left-0 md:right-0">
            <div className="bg-Crayola  rounded-[1.4rem] w-[18rem] m-auto cursor-pointer mb-[1.6rem]">
              <div className="pt-[2.2rem] pb-[2.2rem] pr-[2.8rem] pl-[2.8rem] flex items-center">
                <Setting />
                <p className="ml-[1.5rem] text-3xl text-white">Settings</p>
              </div>
            </div>
            <div className="bg-Crayola  rounded-[1.4rem] w-[18rem] m-auto cursor-pointer">
              <div className="pt-[2.2rem] pb-[2.2rem] pr-[2.8rem] pl-[2.8rem] flex items-center">
                <LogOut />
                <p className="ml-[1.5rem] text-3xl text-white">logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
