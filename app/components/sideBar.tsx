"use client";

import GoldenLogo from "../../public/assets/logo.svg";
import Down from "../../public/assets/Down.svg";
import ArcherVector from "../../public/assets/archer.svg";
import UsersVector from "../../public/assets/Users.svg";
import Vector from "../../public/assets/Vector.svg";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function SideBar({ sideBarName }: { sideBarName: string }) {
  const pathname = usePathname();
  const [flag, setFlag] = useState({});

  return (
    <div className=" md:h-screen md:w-[28.6rem] bg-electricIndigo">
      <div className="md:ml-[4.5rem] md:mr-[6.5rem]">
        <GoldenLogo />
      </div>
      <div className=" mx-auto max-w-lg md:mr-[1.2rem] md:ml-[1.6rem]  ">
        <div className="divide-y ">
          <details className="group" open>
            <summary className="flex md:mb-[5.2rem] font-medium rounded-md bg-light md:pt-[2.2rem] md:pb-[2.2rem] md:pr-[3.8rem] md:pl-[3.8rem] cursor-pointer list-none items-center  text-3xl text-white  ">
              <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[20rem]">
                {sideBarName}
              </p>
              <div className="md:ml-[2.6rem]">
                <Down />
              </div>
            </summary>
            <Link
              href={"/lifeGoals"}
              className={`flex ml-[-5.6rem] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem] ${
                pathname === "/lifeGoals"
                  ? useMemo(
                      () =>
                        setFlag((prevState) => ({
                          ...prevState,
                          lifeGoals: true,
                        })),
                      []
                    )
                  : useMemo(
                      () =>
                        setFlag((prevState) => ({
                          ...prevState,
                          lifeGoals: false,
                        })),
                      []
                    )
              }`}
            >
              {flag && (flag as any).lifeGoals ? (
                <div className="w-[1.2rem] h-[6.6rem] bg-white rounded-r-[1rem] "></div>
              ) : (
                <></>
              )}
              <div className="md:mr-[1.5rem] ml-[2.4rem]">
                <Vector />
              </div>
              Life Goals
            </Link>

            <Link
              href={"/yearlyGoals"}
              className={`flex ml-[-5.6rem] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem] ${
                pathname === "/yearlyGoals"
                  ? useMemo(
                      () =>
                        setFlag((prevState) => ({
                          ...prevState,
                          yearlyGoals: true,
                        })),
                      []
                    )
                  : useMemo(
                      () =>
                        setFlag((prevState) => ({
                          ...prevState,
                          yearlyGoals: false,
                        })),
                      []
                    )
              }`}
            >
              {flag && (flag as any).yearlyGoals ? (
                <div className="w-[1.2rem] h-[6.6rem] bg-white rounded-r-[1rem] "></div>
              ) : (
                <></>
              )}
              <div className="md:mr-[1.5rem] ml-[2.4rem]">
                <ArcherVector />
              </div>
              Yearly Goals
            </Link>

            <Link
              href={"/aboutUs"}
              className={`flex ml-[-5.6rem] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem] ${
                pathname === "/aboutUs"
                  ? useMemo(
                      () =>
                        setFlag((prevState) => ({
                          ...prevState,
                          aboutUs: true,
                        })),
                      []
                    )
                  : useMemo(
                      () =>
                        setFlag((prevState) => ({
                          ...prevState,
                          aboutUs: false,
                        })),
                      []
                    )
              }`}
            >
              {flag && (flag as any).aboutUs ? (
                <div className="w-[1.2rem] h-[6.6rem] bg-white rounded-r-[1rem] "></div>
              ) : (
                <></>
              )}
              <div className="md:mr-[1.5rem] ml-[2.4rem]">
                <UsersVector />
              </div>
              About Us{" "}
            </Link>

            <div className=" text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem]">
              Comming soon ...
            </div>
          </details>
        </div>
      </div>
      {/* <div className="m-auto">
    <button className="flex items-center text-3xl font-normal rounded-sm  absolute bg-white text-lightBlue  pt-[1.7rem] pb-[1.8rem] pr-[4rem] pl-[4rem] ">
      <LogOut />
      <div className="ml-[1rem]">logout</div>
    </button>
  </div> */}
    </div>
  );
}
