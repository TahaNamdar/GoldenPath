"use client";

import { usePathname } from "next/navigation";

import GoldenLogo from "/public/assets/goldenPath.svg";
import ArcherVector from "/public/assets/archer.svg";
import Tool from "/public/assets/Tool.svg";
import Vector from "/public/assets/Vector.svg";
import LogOut from "/public/assets/logOut.svg";
import Setting from "/public/assets/setting.svg";
import Link from "next/link";
import Drawer from "../drawer/drawer";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div>
      <Drawer />
      {/* drawer */}
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
