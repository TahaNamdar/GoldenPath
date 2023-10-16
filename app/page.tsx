"use client";

import React from "react";
import Removal from "@/public/assets/layout/removal.svg";
import Shape1 from "@/public/assets/layout/homeShape1.svg";
import Shadow from "@/public/assets/layout/circleShadow.svg";
import MainShape from "@/public/assets/layout/mainShape.svg";
import Logo from "@/public/assets/layout/homeLogo.svg";

export default function Home() {
  return (
    <main className="bg-homeColor h-screen overflow-auto overflow-x-hidden">
      <div className="relative bg-homeColor bg-cover bg-[url('../public/assets/layout/wallpaper.png')] h-[700px] md:h-[800px]  xl:overflow-hidden xl:h-[900px] w-full xl:flex xl:flex-row-reverse">
        <div className="z-10 flex items-center justify-between rounded-[23px] pl-[70px] pr-[70px] left-1/2 top-[47px] transform -translate-x-1/2  w-10/12 fixed bg-navBar backdrop-blur-[29px]">
          <Logo />
          <div className="text-white">Login</div>
        </div>

        <div className="absolute bottom-[-10%] overflow-x-hidden w-full xl:overflow-x-[unset]">
          <Shape1 />
        </div>
        <div className="absolute bottom-[-12%] overflow-x-hidden w-ful xl:overflow-x-[unset]">
          <MainShape />
        </div>

        <div className="absolute right-[8%]">
          <Shadow />
        </div>

        <div className="w-full xl:w-7/12 relative h-full md:h-full lg:h-full xl:h-auto ">
          <div className="absolute  left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-[10%] xl:transform-none xl:left-[unset] xl:right-[111px]">
            <Removal />
          </div>
        </div>
        <div className="w-full xl:w-5/12 relative h-full md:h-full lg:h-full xl:h-auto ">
          <div className="absolute left-[-2px] top-[16%]">
            <Shadow />
          </div>

          <div className="absolute top-1/2 transform left-[97px] -translate-y-1/2">
            <p className="text-white text-[72px]">Take Back The</p>
            <p className="text-customYellow text-[72px]">
              Control Of Your Life
            </p>
            <p className="text-white text-[24px]">
              set realistic goals, break them into tasks, prioritize them and
              achieve your goals.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
