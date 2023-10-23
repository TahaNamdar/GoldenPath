"use client";

import { useState } from "react";
import SideBar from "@/app/components/sideBar/sideBar";
import { trpc } from "@/utils/trpc";
import moment from "moment";

export default function LifeGoals() {
  const fetchOneUser = trpc.getOneUser.useQuery();

  const { data: userData } = fetchOneUser;

  function getAge(dateString: string) {
    const date = moment(dateString, "YYYY-MM-DD");
    const years = moment().diff(date, "years");

    const days = moment().diff(date.add(years, "years"), "days", false);
    return { years, days };
  }

  const { days } = getAge(userData?.birthday);

  const [tags, setTags] = useState<any[]>([""]);

  const addTags = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
    if (event.key === "Backspace" && event.target.value == "") {
      const copyArr = [...tags];
      copyArr.pop();
      setTags(copyArr);
    }
  };

  return (
    <div className=" bg-CharlestonGreen lg:bg-darkGunmetal lg:flex md:p-1">
      <SideBar />

      <div className="flex-1  bg-CharlestonGreen rounded-md md:pl-[3.7rem] md:pr-[4.6rem] h-screen lg:h-auto">
        <div className="lg:flex items-center justify-between mb-[1rem] lg:mb-[3.7rem] mt-[4.5rem] pl-[2rem] pr-[2rem]">
          <div className="lg:mb-[3.7rem]">
            <p className="text-3xl mb-[1.4rem]  md:text-4xl text-white font-medium md:mb-2">
              Life Goals{" "}
            </p>
            <p className="hidden lg:block text-lightText text-base font-light">
              this page is for you to detaily make tasks for your self untill
              your next birthday
            </p>{" "}
          </div>

          {/* mobile  */}
          <div className="lg:hidden">
            <p className="text-base text-lightText font-light mb-[1rem]	">
              this is all you need to follow when starting your day. start from
              top to bottom.try to keep 3~5 items here
            </p>

            <a className="text-base text-white cursor-pointer underline">
              {" "}
              Tutorial
            </a>
          </div>
          {/* lg */}
          <div className="hidden lg:flex">
            <button className="border border-white text-sm md:text-base rounded-sm text-white ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              Tutorial
            </button>
          </div>
        </div>
        {/* tags input component */}
        <main>
          <div className="bg-darkGunmetal pr-[3.8rem] pl-[2.3rem] lg:pl-[3.8rem] lg:rounded-t-[1.4rem]">
            <div className="text-white text-2xl pt-[2rem] pb-[1.9rem]  lg:text-[1.8rem] flex ">
              <p className="mr-[2.2rem] lg:mr-[4.7rem]">Age</p>
              <p>achievements</p>
            </div>
          </div>
          {/* chip wrapper  */}
          <div className="bg-Crayola pr-[2rem] pl-[2rem]  lg:pr-[3.8rem] lg:pl-[3.8rem] lg:rounded-b-[1.4rem] ">
            <section className="pt-[2rem] pb-[2rem] ">
              <div className="flex items-start mb-[1.6rem]">
                <div className="bg-darkGunmetal text-center text-white pr-[1.3rem] pl-[1.3rem] pt-[1.4rem] pb-[1.4rem] lg:pr-[1.7rem] lg:pl-[1.7rem] lg:pt-[1.4rem] lg:pb-[1.4rem] mr-[1.3rem] flex justify-center items-center text-[1.4rem]  lg:text-[1.8rem] rounded-[1.4rem]">
                  21
                </div>
                {/* chip  */}
                <div className="bg-darkGunmetal rounded-[1.4rem] w-4/5 sm:w-full ">
                  <div className="pt-[1.2rem] pb-[0.8rem] pl-[1.8rem] relative flex">
                    <div className="flex items-center flex-wrap w-11/12 lg:w-10/12  ">
                      {tags.map((tag, index) => {
                        return (
                          <div
                            key={index}
                            className={`bg-chipColor mb-[0.6rem] text-[1.4rem] lg:text-[1.8rem] mr-[0.8rem] lg:mr-[1.6rem] text-black rounded-[3.4rem] pt-[0.2rem] pb-[0.2rem] pr-[0.8rem] pl-[0.8rem] ${
                              tag == "" ? "hidden" : "block"
                            }`}
                          >
                            {tag}
                          </div>
                        );
                      })}
                      <input
                        type="text"
                        placeholder="Type to add a goal..."
                        onKeyUp={addTags}
                        className="pr-[1.8rem] text-[1.4rem] lg:text-[1.8rem] w-[14rem] md:w-[unset] bg-darkGunmetal text-placeholder focus:outline-none placeholder-placeholder mb-[0.6rem] "
                      />
                    </div>
                    <div className="hidden text-center md:flex justify-end pr-[0.8rem] md:pr-[2.2rem] md:items-center  w-2/12 lg:ml-[0.6rem]">
                      <p className="text-white ">72 days left</p>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </section>
          </div>{" "}
        </main>
      </div>
    </div>
  );
}
