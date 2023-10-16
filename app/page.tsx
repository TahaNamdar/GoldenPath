"use client";

import React from "react";
import Removal from "@/public/assets/layout/removal.svg";
import Shape1 from "@/public/assets/layout/homeShape1.svg";
import Shadow from "@/public/assets/layout/circleShadow.svg";
import MainShape from "@/public/assets/layout/mainShape.svg";
import Logo from "@/public/assets/layout/homeLogo.svg";

export default function Home() {
  return (
    <main className="bg-homeColor h-screen ">
      <div className="relative bg-gray-900 bg-cover bg-[url('../public/assets/layout/wallpaper.png')] h-[700px] md:h-[800px] overflow-hidden xl:h-[900px] w-full flex flex-row-reverse">
        <div className=" flex items-center justify-between rounded-[23px] pl-[70px] pr-[70px] left-1/2 top-[47px] transform -translate-x-1/2  w-10/12 fixed bg-navBar backdrop-blur-[29px]">
          <Logo />
          <div className="text-white">Login</div>
        </div>

        <div className="absolute   bottom-[-10%]">
          <Shape1 />
        </div>
        <div className="absolute   bottom-[-12%]">
          <MainShape />
        </div>

        <div className="absolute right-[8%]">
          <Shadow />
        </div>

        <div className="w-full xl:w-7/12 relative ">
          <div className="absolute top-[10%] lg:right-[111px]">
            <Removal />
          </div>
        </div>
        <div className="w-full xl:w-5/12 relative ">
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
