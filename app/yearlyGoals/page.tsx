"use client";

import GroupVector from "../../public/assets/gruop.svg";

export default function YearlyGoals() {
  return (
    <div className="h-screen bg-lightBlue md:flex p-1">
      <div className="md:w-2/12 bg-lightBlue"></div>
      <div className="md:w-10/12 p-10 bg-smoke rounded-md pl-[3.7rem] pr-[4.6rem]">
        {/* Yearly Goals */}
        <div className="md:flex items-center justify-between mb-[3.7rem] mt-[4.5rem]">
          <p className="text-3xl md:text-4xl text-blueViolet font-medium mb-4 md:mb-2">
            Yearly Goals
          </p>
          <div>
            <button className="border border-lavender text-base rounded-sm text-lavender pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              26 Y.O Goals
            </button>
            <button className="border border-lavender text-base rounded-sm text-lavender ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              Tutorial
            </button>
          </div>
        </div>
        {/* Priorities */}

        <div className="bg-white p-10 md:pl-[3.6rem] md:pb-[7.9rem] md:pt-[3.2rem] rounded-md">
          <p className="text-3xl md:text-4xl font-medium md:mb-[0.1rem] text-blueViolet">
            Priorities
          </p>
          <p className="text-blueViolet text-xl mb-[3.4rem]">
            this is all you need to follow when starting your day. start from
            top to bottom.
          </p>
          <div className="rounded-sm mb-[1.6rem] bg-smoke md:w-[40rem] pt-[2rem] pb-[2rem] pl-[2.3rem] flex items-center">
            <GroupVector />
            <p className="text-2xl ml-[2rem] ">transform 2232$ to usdt</p>
          </div>{" "}
          <div className="rounded-sm mb-[1.6rem] bg-smoke md:w-[40rem] pt-[2rem] pb-[2rem] pl-[2.3rem] flex items-center">
            <GroupVector />
            <p className="text-2xl ml-[2rem] ">transform 2232$ to usdt</p>
          </div>{" "}
          <div className="rounded-sm mb-[1.6rem] bg-smoke md:w-[40rem] pt-[2rem] pb-[2rem] pl-[2.3rem] flex items-center">
            <GroupVector />
            <p className="text-2xl ml-[2rem] ">transform 2232$ to usdt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
