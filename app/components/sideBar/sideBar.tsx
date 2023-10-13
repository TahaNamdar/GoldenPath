"use client";

import { useState, useCallback, useEffect } from "react";
import GoldenLogo from "/public/assets/goldenPath.svg";
import ArcherVector from "/public/assets/archer.svg";
import Tool from "/public/assets/Tool.svg";
import Vector from "/public/assets/Vector.svg";
import LogOut from "/public/assets/logOut.svg";
import Setting from "/public/assets/setting.svg";
import ChangeEmail from "/public/assets/changeEmail.svg";
import ChangePass from "/public/assets/changePass.svg";
import Birthday from "/public/assets/birthday.svg";
import Link from "next/link";
import MobileSideBar from "../mobileSidebar/mobileSideBar";
import Modal from "../modal/modal";
import MobileNavigation from "../mobileNavigation/mobileNavigation";
import { useDispatch } from "react-redux";
import { openAction } from "@/app/Redux/featrues/toggle/toggleSlice";

export default function SideBar() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const dispatch = useDispatch();

  const actionHandler = () => {
    dispatch(openAction());
  };

  return (
    <div>
      <MobileNavigation title="Change BirthDay">
        <p className="text-white">Hero mobile navigation</p>
      </MobileNavigation>
      <Modal title="Change BirthDay">
        <p className="text-white">Hero Modal</p>
      </Modal>
      {/* modal */}
      <MobileSideBar />
      {/* drawer */}
      <div className="hidden lg:flex lg:flex-col lg:justify-between lg:h-full md:h-screen md:w-[28.6rem] bg-darkGunmetal relative ">
        <div className="md:mb-[40rem]">
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
          </div>
        </div>

        {/* buttons section */}
        <div className="md:mb-[4rem] md:left-0 md:right-0">
          <div
            className={`bg-Crayola  transition-all duration-300  
            ease-out rounded-[1.4rem] ${
              openSetting ? "w-[22rem] " : "w-[18rem]  "
            }  m-auto cursor-pointer mb-[1.6rem]`}
            onClick={() => setOpenSetting(!openSetting)}
          >
            <div>
              <div className={`${openSetting ? "block pt-6" : "hidden"}`}>
                <div
                  onClick={() => actionHandler()}
                  className="flex items-center bg-darkGunmetal w-4/5 m-auto rounded-[1.4rem] pt-[1.5rem] pb-[1.3rem] cursor-pointer justify-center mb-[1.4rem]"
                >
                  <Birthday />
                  <p className="ml-[1rem] text-sm text-white">
                    Change Birthday
                  </p>
                </div>
                <div className="flex items-center bg-darkGunmetal w-4/5 m-auto rounded-[1.4rem] pt-[1.5rem] pb-[1.3rem] cursor-pointer justify-center mb-[1.4rem]">
                  <ChangeEmail />
                  <p className="ml-[1rem] text-sm text-white">Change Email</p>
                </div>
                <div className="flex items-center bg-darkGunmetal w-4/5 m-auto rounded-[1.4rem] pt-[1.5rem] pb-[1.3rem] cursor-pointer justify-center">
                  <ChangePass />
                  <p className="ml-[1rem] text-sm text-white">
                    Change Password
                  </p>
                </div>
              </div>

              <div className="pt-[2.2rem] pb-[2.2rem] pr-[2.8rem] pl-[2.8rem] justify-center flex items-center">
                <Setting />
                <p className="ml-[1.5rem] text-3xl text-white">Settings</p>
              </div>
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
  );
}
