"use client";

import { useState } from "react";
import GoldenLogo from "/public/assets/goldenPath.svg";
import ArcherVector from "/public/assets/archer.svg";
import Tool from "/public/assets/Tool.svg";
import Vector from "/public/assets/Vector.svg";
import LogOut from "/public/assets/logOut.svg";
import Setting from "/public/assets/setting.svg";
import ChangeEmail from "/public/assets/changeEmail.svg";
import ChangePass from "/public/assets/changePass.svg";
import Birthday from "/public/assets/birthday.svg";
import Link from "next/link";
import MobileSideBar from "../mobileSidebar/mobileSideBar";
import { useDispatch } from "react-redux";
import {
  openAction,
  setModalNameAction,
} from "@/app/Redux/featrues/toggle/toggleSlice";
import InputFiled from "../inputFiled/inputFiled";
import Key from "/public/assets/key.svg";
import Email from "/public/assets/email.svg";
import BirthdaySvg from "/public/assets/birthdaySvg.svg";
import GoldenModal from "../goldenModal/goldenModal";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation

export default function SideBar() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const dispatch = useDispatch();

  const pathName = usePathname();

  const router = useRouter();

  const changeBirthDayActionHandler = () => {
    dispatch(openAction());
    dispatch(setModalNameAction("changeBirthday"));
  };
  const changeEmailActionHandler = () => {
    dispatch(openAction());
    dispatch(setModalNameAction("changeEmail"));
  };
  const changePasswordActionHandler = () => {
    dispatch(openAction());
    dispatch(setModalNameAction("changePassword"));
  };

  function formatInputDate(input: any) {
    const cleaned = input.replace(/\D/g, ""); // Remove all non-numeric characters
    const match = cleaned.match(/^(\d{0,4})(\d{0,2})(\d{0,2})$/); // Use regex to capture groups for year, month, and day

    if (match) {
      // Construct the formatted date based on captured groups
      const formattedDate =
        match[1] +
        (match[2] ? "-" + match[2] : "") +
        (match[3] ? "-" + match[3] : "");
      return formattedDate;
    }
    return "";
  }

  const handleChange = (e: any) => {
    const cleanData = formatInputDate(e.target.value);
    setValue(cleanData);
  };

  const handleLogOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div>
      <GoldenModal title="Change BirthDay" name="changeBirthday">
        <div className="mb-[2.8rem] md:mb-[3.8rem]">
          <InputFiled
            width="w-full"
            type="text"
            label="Birthday"
            id="dateInput"
            placeholder="YYYY-MM-DD"
            fontSize="text-3xl md:text-[2.8rem]"
            maxlength="10"
            onChange={handleChange}
            value={value}
          >
            <BirthdaySvg />
          </InputFiled>
        </div>
        <div className="text-right">
          <button className="bg-chipColor rounded-[1.4rem] w-full sm:w-[28rem] text-center text-black text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]">
            Save
          </button>
        </div>{" "}
      </GoldenModal>

      <GoldenModal title="Change Email" name="changeEmail">
        <div className="mb-[2.8rem] md:mb-[1.2rem]">
          <InputFiled
            width="w-full"
            type="text"
            label="New Email"
            placeholder="type..."
            fontSize="text-3xl md:text-[2.8rem]"
          >
            <Email />
          </InputFiled>
        </div>{" "}
        <div className="mb-[2.8rem] md:mb-[3.8rem]">
          <InputFiled
            width="w-full"
            type="password"
            label="Repeat Password"
            placeholder="type..."
            fontSize="text-3xl md:text-[2.8rem]"
          >
            <Key />
          </InputFiled>
        </div>
        <div className="text-right">
          <button className="bg-chipColor rounded-[1.4rem] w-full sm:w-[28rem] text-center text-black text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]">
            Save
          </button>
        </div>{" "}
      </GoldenModal>

      <GoldenModal title="Change Password" name="changePassword">
        <div className="mb-[2.8rem] md:mb-[1.2rem]">
          <InputFiled
            width="w-full"
            type="password"
            label="Old Password"
            placeholder="type..."
            fontSize="text-3xl;md:text-[2.8rem]"
          >
            <Key />
          </InputFiled>
        </div>{" "}
        <div className="mb-[2.8rem] md:mb-[1.2rem]">
          <InputFiled
            width="w-full"
            type="password"
            label="New Password"
            placeholder="type..."
            fontSize="text-3xl md:text-[2.8rem]"
          >
            <Key />
          </InputFiled>
        </div>{" "}
        <div className="mb-[2.8rem] md:mb-[3.8rem]">
          <InputFiled
            width="w-full"
            type="password"
            label="Repeat Password"
            placeholder="type..."
            fontSize="text-3xl md:text-[2.8rem]"
          >
            <Key />
          </InputFiled>
        </div>
        <div className="text-right">
          <button className="bg-chipColor rounded-[1.4rem] w-full sm:w-[28rem] text-center text-black text-2xl md:text-3xl pl-[10rem] pr-[10rem] pt-[1.2rem] pb-[1.2rem] md:pl-[11rem] md:pr-[11rem] md:pt-[1.8rem] md:pb-[1.8rem]">
            Save
          </button>
        </div>
      </GoldenModal>
      {/* modal */}
      <MobileSideBar />
      {/* drawer */}
      <div className="hidden lg:flex lg:flex-col lg:justify-between lg:h-full md:h-screen md:w-[28.6rem] bg-darkGunmetal relative ">
        <div className="md:mb-[40rem]">
          <div className="md:ml-[10rem] md:mr-[12.1rem] md:mt-[4.5rem] md:mb-[6.7rem]">
            <GoldenLogo />
          </div>

          <div className="flex flex-col justify-between ">
            <div className=" mx-auto max-w-lg md:mr-[1.2rem] md:ml-[1.6rem]  ">
              <div>
                <Link
                  href={"/dashboard"}
                  className={`${
                    pathName == "/dashboard"
                      ? "bg-gradient-to-r from-[#31353E] "
                      : ""
                  } flex ml-[-5.6rem] pt-[21px] pb-[21px] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] `}
                >
                  <div className="md:mr-[1.5rem] ml-[2.4rem]">
                    <Vector />
                  </div>
                  Life Goals
                </Link>

                <Link
                  href={"/dashboard/yearlyGoals"}
                  className={` ${
                    pathName == "/dashboard/yearlyGoals"
                      ? "bg-gradient-to-r from-[#31353E] "
                      : ""
                  }flex ml-[-5.6rem] pt-[21px] pb-[21px] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] `}
                >
                  <div className="md:mr-[1.5rem] ml-[2.4rem]">
                    <ArcherVector />
                  </div>
                  Yearly Goals
                </Link>

                <Link
                  href={"/aboutUs"}
                  className="flex ml-[-5.6rem] pt-[21px] pb-[21px] items-center cursor-pointer text-white font-normal text-3xl md:pl-[3.8rem] "
                >
                  <div className="md:mr-[1.5rem] ml-[2.4rem]">
                    <Tool />
                  </div>
                  productivity tool
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* buttons section */}
        <div className="md:mb-[4rem] md:left-0 md:right-0">
          <div
            className={`bg-Crayola  transition-all duration-300  
            ease-out rounded-[1.4rem] ${
              openSetting ? "w-[22rem] " : "w-[18rem]  "
            }  m-auto cursor-pointer mb-[1.6rem]`}
            onClick={() => setOpenSetting(!openSetting)}
          >
            <div>
              <div className={`${openSetting ? "block pt-6" : "hidden"}`}>
                <div
                  onClick={() => changeBirthDayActionHandler()}
                  className="flex items-center bg-darkGunmetal w-4/5 m-auto rounded-[1.4rem] pt-[1.5rem] pb-[1.3rem] cursor-pointer justify-center mb-[1.4rem]"
                >
                  <Birthday />
                  <p className="ml-[1rem] text-sm text-white">
                    Change Birthday
                  </p>
                </div>
                <div
                  onClick={() => changeEmailActionHandler()}
                  className="flex items-center bg-darkGunmetal w-4/5 m-auto rounded-[1.4rem] pt-[1.5rem] pb-[1.3rem] cursor-pointer justify-center mb-[1.4rem]"
                >
                  <ChangeEmail />
                  <p className="ml-[1rem] text-sm text-white">Change Email</p>
                </div>
                <div
                  onClick={() => changePasswordActionHandler()}
                  className="flex items-center bg-darkGunmetal w-4/5 m-auto rounded-[1.4rem] pt-[1.5rem] pb-[1.3rem] cursor-pointer justify-center"
                >
                  <ChangePass />
                  <p className="ml-[1rem] text-sm text-white">
                    Change Password
                  </p>
                </div>
              </div>

              <div className="pt-[2.2rem] pb-[2.2rem] pr-[2.8rem] pl-[2.8rem] justify-center flex items-center">
                <Setting />
                <p className="ml-[1.5rem] text-3xl text-white">Settings</p>
              </div>
            </div>
          </div>
          <div className="bg-Crayola  rounded-[1.4rem] w-[18rem] m-auto cursor-pointer">
            <div className="pt-[2.2rem] pb-[2.2rem] pr-[2.8rem] pl-[2.8rem] flex items-center">
              <LogOut />
              <p
                className="ml-[1.5rem] text-3xl text-white"
                onClick={handleLogOut}
              >
                logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
