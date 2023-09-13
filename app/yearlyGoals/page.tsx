"use client";

import GroupVector from "../../public/assets/group.svg";
import EditVector from "../../public/assets/Edit.svg";
import GoldenLogo from "../../public/assets/logo.svg";
import Down from "../../public/assets/Down.svg";
import ArcherVector from "../../public/assets/archer.svg";
import UsersVector from "../../public/assets/Users.svg";
import Vector from "../../public/assets/Vector.svg";
import LogOut from "../../public/assets/Logout.svg";

export default function YearlyGoals() {
  return (
    <div className="bg-electricIndigo md:flex p-1">
      {/* SideBar */}
      <div className=" md:h-screen md:w-[28.6rem] bg-electricIndigo">
        <div className="md:ml-[4.5rem] md:mr-[6.5rem]">
          <GoldenLogo />
        </div>
        <div className=" mx-auto max-w-lg md:mr-[1.2rem] md:ml-[1.6rem]  ">
          <div className="divide-y ">
            <details className="group" open>
              <summary className="flex md:mb-[5.2rem] font-medium rounded-md bg-light md:pt-[2.2rem] md:pb-[2.2rem] md:pr-[3.8rem] md:pl-[3.8rem] cursor-pointer list-none items-center  text-3xl text-white  ">
                Jymy Marston
                <div className="md:ml-[2.6rem]">
                  <Down />
                </div>
              </summary>
              <div className="flex items-center text-white cursor-pointer font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem] md:ml-[-5.4rem] ">
                <div className="w-[1.2rem] h-[6.6rem] bg-white rounded-r-[1rem] "></div>
                <div className="md:mr-[1.5rem] ml-[2.4rem]">
                  <Vector />
                </div>
                Life Goals
              </div>
              <div className="flex items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem]">
                <div className="md:mr-[1.5rem]">
                  <ArcherVector />
                </div>
                Yearly Goals
              </div>
              <div className="flex items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] md:mb-[4rem]">
                <div className="md:mr-[1.5rem]">
                  <UsersVector />
                </div>
                About Us
              </div>
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
      {/* Yearly Goals */}

      <div className="md:flex-1 p-10 bg-smoke rounded-md pl-[3.7rem] pr-[4.6rem]">
        <div className="md:flex items-center justify-between mb-[3.7rem] mt-[4.5rem]">
          <p className="text-3xl  md:text-4xl text-blueViolet font-medium mb-4 md:mb-2">
            Yearly Goals
          </p>
          <div>
            <button className="border border-lavender text-sm md:text-base rounded-sm text-lavender pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              26 Y.O Goals
            </button>
            <button className="border border-lavender text-sm md:text-base rounded-sm text-lavender ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              Tutorial
            </button>
          </div>
        </div>
        {/* Priorities */}

        <div className="bg-white p-10 mb-[4rem] md:pl-[3.6rem] md:pb-[7.9rem] md:pt-[3.2rem] rounded-md">
          <p className="text-3xl md:text-4xl font-medium md:mb-[0.1rem] text-blueViolet">
            Priorities
          </p>
          <p className="text-blueViolet text-xl mb-[3.4rem] font-normal">
            this is all you need to follow when starting your day. start from
            top to bottom.
          </p>
          <div className="rounded-sm mb-[1.6rem] bg-smoke md:w-[40rem] pt-[2rem] pb-[2rem] pl-[2.3rem] flex items-center">
            <GroupVector />
            <p className="text-lightBlack font-normal text-2xl ml-[2rem] ">
              transform 2232$ to usdt
            </p>
          </div>{" "}
          <div className="rounded-sm mb-[1.6rem] bg-smoke md:w-[40rem] pt-[2rem] pb-[2rem] pl-[2.3rem] flex items-center">
            <GroupVector />
            <p className="text-lightBlack text-2xl ml-[2rem] ">
              transform 2232$ to usdt
            </p>
          </div>{" "}
          <div className="rounded-sm mb-[1.6rem] bg-smoke md:w-[40rem] pt-[2rem] pb-[2rem] pl-[2.3rem] flex items-center">
            <GroupVector />
            <p className="text-2xl ml-[2rem] text-lightBlack">
              transform 2232$ to usdt
            </p>
          </div>
        </div>

        {/* Activities */}

        <div className="md:flex items-center justify-between mb-[3.7rem] mt-[4.5rem]">
          <p className="text-3xl md:text-4xl text-blueViolet font-medium mb-4 md:mb-2">
            Activities
          </p>
          <div className="flex items-center">
            <button className="border flex items-center border-lavender text-sm md:text-base rounded-lg text-lavender pt-[0.9rem] pb-[0.9rem] pr-[2.3rem] pl-[2.3rem]">
              <EditVector />
              <span className="ml-[1rem] ">edit</span>
            </button>
            <button className="border border-lavender text-sm md:text-base rounded-lg text-lavender ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              show all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
