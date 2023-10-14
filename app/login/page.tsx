"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Star1 from "/public/assets/star1.svg";
import Star2 from "/public/assets/star2.svg";
import Star3 from "/public/assets/star3.svg";
import XlLogo from "/public/assets/xlLoginLogo.svg";
import Logo from "/public/assets/loginLogo.svg";
import { useState, useEffect } from "react";

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
      <div className="w-full h-screen md:w-[34rem] lg:w-[60.6rem] xl:w-[80rem] bg-darkGunmetal"></div>
      <div className="flex-1 relative hidden sm:block ">
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
