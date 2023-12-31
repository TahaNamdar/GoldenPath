"use client";

import Star1 from "/public/assets/star1.svg";
import Star2 from "/public/assets/star2.svg";
import Star3 from "/public/assets/star3.svg";
import XlLogo from "/public/assets/xlLoginLogo.svg";
import Logo from "/public/assets/loginLogo.svg";
import { useState, useEffect } from "react";
import InputFiled from "@/app/components/inputFiled/inputFiled";
import Email from "/public/assets/smEmail.svg";
import Pass from "/public/assets/smPassword.svg";
import GoogleLogo from "@/public/assets/google.png";
import FaceBookLogo from "@/public/assets/facebook.png";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email should be valid and contain @")
      .required("Email is required"),
    password: yup
      .string()
      .required("No password provided.")
      .min(4, "Password is too short - should be 8 chars minimum."),
    validation: yup.string(),
  })
  .required();

export default function Register() {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

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

  const mutation = trpc.signUp.useMutation();

  const { isSuccess, isError, error } = mutation;

  const submit = (data: any) => {
    const { email, password } = data;
    mutation.mutate({ email, password });
  };

  const signInGoogleHandler = async () => {
    const res = await signIn("google");
  };

  const signInFaceBookHandler = async () => {
    const res = await signIn("facebook");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
      reset();
    }
    if (isError) {
      setError("validation", {
        type: "custom",
        message: "Somethings Wrong ",
      });
    }
  }, [isSuccess, isError, error]);

  return (
    <div>
      <div className="bg-Crayola  block sm:flex sm:flex-row-reverse sm:overflow-hidden ">
        <div className="w-full overflow-auto h-screen z-50 lg:w-[60.6rem] xl:w-[80rem] bg-darkGunmetal  pr-[2rem] pl-[2rem] flex flex-col justify-center md:pr-[10rem] md:pl-[10rem]  xl:pr-[12.2rem] xl:pl-[12.2rem]">
          <p className="text-white text-center text-[2.4rem] md:text-[3.2rem] xl:text-[4.8rem] mb-[9rem]  md:mb-[4.7rem] md: xl:mb-[11.1rem] lg:pt-[22.4rem]">
            Register
          </p>
          <form onSubmit={handleSubmit(submit)}>
            <div className="mb-[2.8rem] md:mb-[1.2rem]">
              <InputFiled
                width="w-full"
                type="text"
                label="Email"
                placeholder="golden@gmail.com"
                fontSize="text-2xl lg:text-3xl xl:text-[24px]"
                register={register}
                registerName="email"
              >
                <Email />
              </InputFiled>
              <p className="text-danger mt-2 pl-[10px]">
                {errors.email?.message}
              </p>
            </div>{" "}
            <div className="mb-[2rem] md:mb-[2rem]">
              <InputFiled
                width="w-full"
                type="password"
                label="Password"
                placeholder="*****"
                fontSize="text-2xl lg:text-3xl xl:text-[24px]"
                register={register}
                registerName="password"
              >
                <Pass />
              </InputFiled>
              <p className="text-danger mt-2 pl-[10px]">
                {errors.password?.message}
              </p>
            </div>
            <div className="mb-[9rem] md:mb-[7.8rem] xl:mb-[9rem]">
              <p className="text-danger mt-6 text-[14px]">
                {errors.validation?.message}
              </p>
            </div>
            <div className="text-right mb-[3.9rem]">
              <input
                value="Register"
                type="submit"
                className="bg-chipColor cursor-pointer rounded-[1.4rem] w-full text-center text-black text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]"
              />
            </div>
          </form>
          <div className="mb-[3.7rem]">
            <div className="h-[1px] bg-white w-full relative">
              <p className="text-white bg-darkGunmetal w-[14rem] lg:w-[16rem] m-auto text-center  text-sm md:text-2xl absolute left-0 right-0 bottom-[-1rem]">
                Or Continue With
              </p>
            </div>
          </div>
          <div className="text-right mb-[3.9rem]">
            <button
              onClick={() => signInGoogleHandler()}
              className="flex items-center justify-center rounded-[1.4rem] border-[1px] border-white w-full text-center text-white  text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]"
            >
              <Image src={GoogleLogo} alt="google icon" className="mr-[12px]" />
              Google
            </button>
          </div>{" "}
          {/* <div className="text-right mb-[3.9rem]">
            <button
              onClick={() => signInFaceBookHandler()}
              className="flex items-center justify-center rounded-[1.4rem] border-[1px] border-white w-full text-center text-white  text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]"
            >
              <Image
                src={FaceBookLogo}
                alt="google icon"
                className="mr-[12px]"
              />
              FaceBook
            </button>
          </div>{" "} */}
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
    </div>
  );
}
