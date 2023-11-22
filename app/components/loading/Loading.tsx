import React from "react";
import Logo from "@/public/assets/layout/newLogo.svg";

export default function Loading() {
  return (
    <div className=" bg-darkGunmetal h-screen backdrop-blur flex items-center justify-center z-[9999]">
      <div className="flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
}
