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
    <div className="bg-Crayola h-screen block sm:flex sm:flex-row-reverse sm:overflow-hidden ">
      <div className="w-full overflow-auto h-screen z-50 lg:w-[60.6rem] xl:w-[80rem] bg-darkGunmetal  pr-[2rem] pl-[2rem] flex flex-col justify-center md:pr-[10rem] md:pl-[10rem]  xl:pr-[12.2rem] xl:pl-[12.2rem]">
        <p className="text-white text-center text-[2.4rem] md:text-[3.2rem] xl:text-[4.8rem] mb-[9rem]  md:mb-[4.7rem] md: xl:mb-[11.1rem] pt-[18rem] lg:pt-[22.4rem]">
          Login
        </p>
        <div className="mb-[2.8rem] md:mb-[1.2rem]">
          <InputFiled
            width="w-full"
            type="text"
            label="Email"
            placeholder="golden@gmail.com"
          >
            <Email />
          </InputFiled>
        </div>{" "}
        <div className="mb-[2rem] md:mb-[2rem]">
          <InputFiled
            width="w-full"
            type="password"
            label="Password"
            placeholder="*****"
          >
            <Pass />
          </InputFiled>
        </div>
        <div>
          <p className="text-danger text-base sm:text-2xl cursor-pointer mb-[9rem] md:mb-[7.8rem] xl:mb-[9rem]">
            forget password
          </p>
        </div>
        <div className="text-right mb-[3.9rem]">
          <button className="bg-chipColor rounded-[1.4rem] w-full text-center text-black text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]">
            Login
          </button>
        </div>
        <div className="mb-[3.7rem]">
          <div className="h-[1px] bg-white w-full relative">
            <p className="text-white bg-darkGunmetal w-[14rem] lg:w-[16rem] m-auto text-center  text-sm md:text-2xl absolute left-0 right-0 bottom-[-1rem]">
              Or Continue With
            </p>
          </div>
        </div>
        <div className="text-right mb-[3.9rem]">
          <button className=" rounded-[1.4rem] border-[1px] border-white w-full text-center text-white  text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]">
            Google
          </button>
        </div>{" "}
        <div className="text-right mb-[3.9rem] ">
          <button className=" rounded-[1.4rem] w-full border-[1px] border-white text-center text-white text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1rem] md:pb-[1.8rem]">
            Facebook
          </button>
        </div>
      </div>
      <div className="flex-1 relative hidden lg:block ">
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
