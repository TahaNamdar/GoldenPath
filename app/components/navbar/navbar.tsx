import React from "react";
import Logo from "@/public/assets/layout/homeLogo.svg";
import SmLogo from "@/public/assets/layout/Final.svg";
import Profile from "@/public/assets/layout/profile.svg";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className=" z-[99] flex items-center justify-center lg:justify-between lg:rounded-[23px] lg:pl-[70px] lg:pr-[70px] left-1/2 lg:top-[47px] transform -translate-x-1/2 w-full  lg:w-[88%] fixed bg-navBar backdrop-blur-[7.5px] lg:backdrop-blur-[29px]">
      <div className="hidden lg:block">
        <Logo />
      </div>{" "}
      <div className="block lg:hidden pt-[25px] pb-[11px]">
        <SmLogo />
      </div>
      <div
        className="text-white hidden lg:block cursor-pointer text-[14px] xl:text-[18px]  pl-[33px] pr-[33px] pt-[9px] pb-[9px]  xl:pl-[27px] xl:pr-[27px] rounded-[14px] xl:pt-[10px] xl:pb-[10px] border-[1px] border-white"
        onClick={() => handleLogin()}
      >
        Login
      </div>
      <div className="block lg:hidden absolute right-[24px] top-[32px] cursor-pointer ">
        <Profile />
      </div>
    </div>
  );
}
