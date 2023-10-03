"use client";

import { useState } from "react";
import DragSvg from "../../public/assets/Drag.svg";
import SideBar from "../components/sideBar/sideBar";

export default function YearlyGoals() {
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    <div className="bg-CharlestonGreen lg:bg-darkGunmetal lg:flex md:p-1">
      {/* SideBar */}
      <SideBar sideBarName="yearly Page" />
      {/* Yearly Goals */}

      <div className="flex-1 p-10 bg-CharlestonGreen rounded-md pl-[0.6rem] pr-[0.6rem] md:pl-[3.7rem] md:pr-[4.6rem]">
        <div className="flex items-center justify-between mb-[3.7rem] mt-[4.5rem]">
          <p className="text-3xl  md:text-4xl text-white font-medium mb-4 md:mb-2">
            Yearly Goals
          </p>
          <div>
            <button className="border border-white text-sm md:text-base rounded-sm text-white pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              26 Y.O Goals
            </button>
            <button className="border border-white text-sm md:text-base rounded-sm text-white ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              Tutorial
            </button>
          </div>
        </div>
        {/* Priorities */}
        <div className="bg-Crayola p-10 mb-[4rem] md:pl-[3.6rem] md:pb-[7.9rem] md:pt-[3.2rem] rounded-md ">
          <p className="text-3xl md:text-4xl font-medium md:mb-[0.1rem] text-white">
            Priorities
          </p>
          <p className="text-white text-xl mb-[3.4rem] font-normal">
            this is all you need to follow when starting your day. start from
            top to bottom.
          </p>

          <div className="md:flex md:flex-wrap">
            <div className="md:w-1/2">
              {" "}
              <div
                className="flex items-center mb-[1.6rem]"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <div className="p-4 text-center bg-darkGunmetal mr-[1rem] rounded-large pt-[1.7rem] pb-[1.7rem] pr-[1.1rem] pl-[1.1rem] w-[5.4rem] text-2xl text-white">
                  1
                </div>
                <div className="rounded-sm  bg-darkGunmetal w-full md:w-9/12 ">
                  <div className="pl-[2.2rem] flex items-center">
                    {isShown ? (
                      <div>
                        <DragSvg />{" "}
                      </div>
                    ) : null}
                    <p className="text-gold font-normal text-base md:text-2xl pt-[2rem] ml-[2.1rem] pb-[2.1rem] sm:pr-[16rem] md:pt-[1.8rem] md:ml-[1.7rem] md:pb-[1.5rem] md:pr-[0.4rem] lg:pt-[2rem] lg:ml-[2.1rem] lg:pb-[2.1rem] lg:pr-[0]  ">
                      transform 2232$ to usdt
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              {" "}
              <div
                className="flex items-center mb-[1.6rem]"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <div className="p-4 text-center bg-darkGunmetal mr-[1rem] rounded-large pt-[1.7rem] pb-[1.7rem] pr-[1.1rem] pl-[1.1rem] w-[5.4rem] text-2xl text-white">
                  1
                </div>
                <div className="rounded-sm  bg-darkGunmetal w-full md:w-9/12    ">
                  <div className="pl-[2.2rem] flex items-center">
                    {isShown ? (
                      <div>
                        <DragSvg />{" "}
                      </div>
                    ) : null}
                    <p className="text-gold font-normal text-base md:text-2xl pt-[2rem] ml-[2.1rem] pb-[2.1rem] sm:pr-[16rem] md:pt-[1.8rem] md:ml-[1.7rem] md:pb-[1.5rem] md:pr-[0.4rem] lg:pt-[2rem] lg:ml-[2.1rem] lg:pb-[2.1rem] lg:pr-[0]  ">
                      transform 2232$ to usdt
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              {" "}
              <div
                className="flex items-center mb-[1.6rem]"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <div className="p-4 text-center bg-darkGunmetal mr-[1rem] rounded-large pt-[1.7rem] pb-[1.7rem] pr-[1.1rem] pl-[1.1rem] w-[5.4rem] text-2xl text-white">
                  1
                </div>
                <div className="rounded-sm  bg-darkGunmetal w-full md:w-9/12    ">
                  <div className="pl-[2.2rem] flex items-center">
                    {isShown ? (
                      <div>
                        <DragSvg />{" "}
                      </div>
                    ) : null}
                    <p className="text-gold font-normal text-base md:text-2xl pt-[2rem] ml-[2.1rem] pb-[2.1rem] sm:pr-[16rem] md:pt-[1.8rem] md:ml-[1.7rem] md:pb-[1.5rem] md:pr-[0.4rem] lg:pt-[2rem] lg:ml-[2.1rem] lg:pb-[2.1rem] lg:pr-[0]  ">
                      transform 2232$ to usdt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Activities */}
        <div className="md:flex items-center justify-between mb-[1.6rem] mt-[4.5rem]">
          <p className="text-3xl md:text-4xl text-white font-medium mb-4 md:mb-2">
            life Dimensions{" "}
          </p>
        </div>
        {/* notion */}
      </div>
    </div>
  );
}
