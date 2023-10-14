"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Star1 from "/public/assets/star1.svg";
import Star2 from "/public/assets/star2.svg";
import Star3 from "/public/assets/star3.svg";
import XlLogo from "/public/assets/xlLoginLogo.svg";
import Logo from "/public/assets/loginLogo.svg";
import { useState, useEffect } from "react";
import InputFiled from "../components/inputFiled/inputFiled";
import Email from "/public/assets/changeEmail.svg";
import Pass from "/public/assets/changePass.svg";

export default function Login() {
  const [isXlScreen, setIsXlScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1450) {
      setIsXlScreen(true);
    } else {
      setIsXlScreen(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 1450) {
        setIsXlScreen(true);
      } else {
        setIsXlScreen(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const { data: session } = useSession();

  const router = useRouter();

  const email = "tag@ldfd.com";
  const password = "12345";

  const submit = async () => {
    const login = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <div className="bg-Crayola h-screen block sm:flex sm:flex-row-reverse ">
      <div className="w-full h-screen z-50 md:w-[50rem]  lg:w-[60.6rem] xl:w-[80rem] bg-darkGunmetal pt-[7.4rem] pr-[2rem] pl-[2rem] md:pt-[8.5rem] md:pr-[10rem] md:pl-[10rem] xl:pt-[22.4rem] xl:pr-[12.2rem] xl:pl-[12.2rem]">
        <div className="mb-[2.8rem] md:mb-[1.2rem]">
          <InputFiled
            width="w-full"
            type="text"
            label="Email"
            placeholder="type..."
          >
            <Email />
          </InputFiled>
        </div>{" "}
        <div className="mb-[2.8rem] md:mb-[3.8rem]">
          <InputFiled
            width="w-full"
            type="password"
            label="Password"
            placeholder="type..."
          >
            <Pass />
          </InputFiled>
        </div>
        <div className="text-right">
          <button className="bg-chipColor rounded-[1.4rem] w-full text-center text-black text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]">
            Save
          </button>
        </div>{" "}
      </div>
      <div className="flex-1 relative hidden md:block ">
        <div className=" bg-[url('../public/assets/xlLoginShape1.svg')] bg-contain bg-no-repeat fixed h-screen  w-full bottom-0"></div>
        <div className=" bg-[url('../public/assets/xlLoginShape2.svg')] bg-contain bg-no-repeat w-full fixed h-screen mt-[-0.3rem]"></div>
        <div className="absolute top-[3%] left-[57%]">
          <Star1 />
        </div>
        <div className="absolute top-[20%] left-[20%]">
          <Star2 />
        </div>
        <div className="absolute bottom-[40%] md:bottom-[30%] left-[80%]">
          <Star3 />
        </div>{" "}
        <div className="absolute top-[25%] left-[80%] md:block xl:hidden ">
          <Star1 />
        </div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {isXlScreen ? <XlLogo /> : <Logo />}
        </div>
      </div>
    </div>
  );
}
