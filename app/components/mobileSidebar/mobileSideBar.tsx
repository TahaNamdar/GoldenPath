"use client";

import React, { useEffect, useState } from "react";
import Burger from "/public/assets/Burger.svg";
import GoldenText from "/public/assets/logoText.svg";
import ArcherVector from "/public/assets/archer.svg";
import Tool from "/public/assets/Tool.svg";
import Vector from "/public/assets/Vector.svg";
import LogOut from "/public/assets/logOut.svg";
import Setting from "/public/assets/setting.svg";
import Link from "next/link";
import GoldenLogo from "/public/assets/goldenPath.svg";
import ChangeEmail from "/public/assets/changeEmail.svg";
import ChangePass from "/public/assets/changePass.svg";
import Birthday from "/public/assets/birthday.svg";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/Redux/store/store";
import {
  openAction,
  openDrawerAction,
  closeDrawerAction,
  openModalAction,
} from "@/app/Redux/featrues/toggle/toggleSlice";
import OutsideClickHandler from "react-outside-click-handler";

export default function MobileSideBar() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const dispatch = useDispatch();

  const active = useSelector((state: RootState) => state.toggle.active);

  const drawerActive = useSelector(
    (state: RootState) => state.toggle.drawerActive
  );

  useEffect(() => {
    if (active) {
      dispatch(closeDrawerAction());
    }
  }, [active]);

  const actionHandler = () => {
    dispatch(openAction());
  };

  if (window.innerWidth > 540) {
    dispatch(openModalAction());
  }

  return (
    <div>
      <div className="lg:hidden relative">
        <div
          className="absolute right-6 top-6 cursor-pointer"
          onClick={() => dispatch(openDrawerAction())}
        >
          <Burger />
        </div>
        <div className="flex justify-center pt-[2.1rem]">
          <GoldenText />
        </div>
      </div>

      <OutsideClickHandler
        onOutsideClick={() => {
          dispatch(closeDrawerAction());
        }}
      >
        <div
          className={`top-0 right-0 w-[30rem] sm:w-[50vw] overflow-auto flex flex-col  lg:hidden bg-drawerColor backdrop-blur-lg	 p-10  text-white fixed h-full z-40  ease-in-out duration-300 ${
            drawerActive ? "translate-x-0 " : "translate-x-full"
          }`}
        >
          <div className="flex justify-center mb-[7.4rem]">
            <GoldenLogo />
          </div>{" "}
          <div className="m-auto">
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
          </div>
          <div className="bottom-[6.4rem]">
            <div
              className="bg-Crayola  transition-all duration-300  ease-out rounded-[1.4rem]  w-4/5  m-auto cursor-pointer mb-[1.6rem]"
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

                <div className="pt-[1.2rem] pb-[1.2rem] pr-[2.8rem] pl-[2.8rem] justify-center flex items-center">
                  <Setting />
                  <p className="ml-[1.5rem] text-2xl text-white">Settings</p>
                </div>
              </div>
            </div>
            <div className="bg-Crayola  rounded-[1.4rem] w-4/5 m-auto cursor-pointer">
              <div className="pt-[1.2rem] pb-[1.2rem] pr-[2.8rem] pl-[2.8rem] flex items-center justify-center">
                <LogOut />
                <p className="ml-[1.5rem] text-2xl text-white">logout</p>
              </div>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
