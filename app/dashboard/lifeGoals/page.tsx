"use client";

import SideBar from "@/app/components/sideBar/sideBar";
import Chip from "@/app/components/chips/chips";
import { DragDropContext } from "react-beautiful-dnd";
import { trpc } from "@/utils/trpc";
import moment from "moment";
import { useRef } from "react";

export default function LifeGoals() {
  const fetchOneUser = trpc.getOneUser.useQuery();

  const { data: userData } = fetchOneUser;

  function getAge(dateString: string) {
    const date = moment(dateString, "YYYY-MM-DD");
    const years = moment().diff(date, "years");

    const days = moment().diff(date.add(years, "years"), "days", false);
    return { years, days };
  }

  const { days, years } = getAge(userData?.birthday);

  const limit = years + 7;

  const chipsFromAgeArray = [];

  for (let i = 0; i < limit; i++) {
    chipsFromAgeArray.push(
      <Chip key={i} counter={i + 1} daysLeft={days} age={years} index={i} />
    );
  }

  // const reorder = (list: any, startIndex: any, endIndex: any) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);

  //   return result;
  // };

  // const onDragEnd = (result: any) => {
  //   const { source, destination } = result;
  //   // console.log(result, "res");
  //   // if (!result.destination) return;
  //   // //change position
  //   // // const items = reorder(state, result.source.index, result.destination.index);
  //   // // setState(items);
  //   // //move
  //   if (source.droppableId === destination.droppableId) {
  //     const items = reorder(state, source.index, destination.index);
  //     setState(items);
  //   }

  // };

  return (
    <div className=" bg-CharlestonGreen lg:bg-darkGunmetal lg:flex md:p-1">
      <SideBar />

      <div className="flex-1  bg-CharlestonGreen rounded-md lg:pl-[3.7rem] lg:pr-[4.6rem] h-screen xl:h-auto">
        <div className="lg:flex items-center justify-between mb-[1rem] lg:mb-[3.7rem] mt-[4.5rem] pl-[2rem] pr-[2rem]">
          <div className="lg:mb-[2rem]">
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
        <main className="mb-[4rem]">
          <div className="bg-darkGunmetal pr-[3.8rem] pl-[2.3rem] lg:pl-[3.8rem] lg:rounded-t-[1.4rem]">
            <div className="text-white text-2xl pt-[2rem] pb-[1.9rem]  lg:text-[1.8rem] flex ">
              <p className="mr-[2.2rem] lg:mr-[4.7rem]">Age</p>
              <p>achievements</p>
            </div>
          </div>
          {/* chips */}
          <div className="bg-Crayola pl-[2rem]  lg:pr-[3.8rem] lg:pl-[3.8rem] lg:rounded-b-[1.4rem] ">
            <section className="pt-[2rem] sm:pr-[2rem] pb-[2rem] ">
              <DragDropContext onDragEnd={() => console.log("")}>
                {chipsFromAgeArray}
              </DragDropContext>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
