"use client";

import { useEffect } from "react";
import SideBar from "@/app/components/sideBar/sideBar";
import Chip from "@/app/components/chips/chips";
import { DragDropContext } from "react-beautiful-dnd";
import { trpc } from "@/utils/trpc";
import moment from "moment";
import { RootState } from "@/app/Redux/store/store";
import { useSelector } from "react-redux";
import { setLifeGoals, reorderChips } from "@/app/Redux/featrues/chipSlice";
import { useDispatch } from "react-redux";
import Loading from "@/app/components/loading/Loading";
import { useRouter } from "next/navigation";
import {
  openAction,
  setModalNameAction,
} from "@/app/Redux/featrues/toggle/toggleSlice";

export default function LifeGoals() {
  const dispatch = useDispatch();

  const router = useRouter();

  const state = useSelector((state: RootState) => state.chip); // Assuming "chip" is the slice name

  const fetchOneUser = trpc.getOneUser.useQuery();
  const updateChipIndexMutation = trpc.updateChipIndex.useMutation();

  const { data: userData } = fetchOneUser;

  function getAge(dateString: string) {
    const date = moment(dateString, "YYYY-MM-DD");
    const years = moment().diff(date, "years");

    const days = moment().diff(date.add(years, "years"), "days", false);
    return { years, days };
  }

  const { days, years } = getAge(userData?.birthday);

  useEffect(() => {
    if (years <= 1) {
      dispatch(openAction());
      dispatch(setModalNameAction("changeBirthday"));
    }
  }, [years]);

  const fetchLifeGoals = trpc.getLifeGoals.useQuery();

  const { data: lifeData, isSuccess, isLoading } = fetchLifeGoals;

  useEffect(() => {
    if (years) {
      const element = document.getElementById(`chips-${years - 8}`);
      const chipsWrapper = document.getElementById("chipsWrapper");

      if (element && chipsWrapper) {
        const y = element.getBoundingClientRect().top + chipsWrapper.scrollTop;
        chipsWrapper.scroll({
          top: y,
        });
      }
    }
  }, [years]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLifeGoals(lifeData));
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  const chipsFromAgeArray = [];

  for (let i = 0; i < lifeData.length; i++) {
    chipsFromAgeArray.push(
      <Chip
        key={i}
        counter={i + 1}
        daysLeft={days}
        age={years}
        index={i}
        chips={state[i + 1]}
      />
    );
  }

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    const destinationAge = destination.droppableId.split("-")[1];
    const sourceAge = source.droppableId.split("-")[1];

    const destinationId = state[destinationAge].id;
    const sourceValues = state[sourceAge];

    const item = sourceValues.Chips.find(
      (item: any) => item.id === draggableId
    );

    if (!destination) return;
    //sorting in local age

    updateChipIndexMutation.mutate({
      source_id: sourceValues.id,
      destination_id: destinationId,
      destination_index: destination.index,
      item_id: draggableId,
    });

    dispatch(
      reorderChips({
        source_age: sourceAge,
        destination_age: destinationAge,
        source_index: source.index,
        destination_index: destination.index,
      })
    );
  };

  return (
    <div className=" bg-CharlestonGreen lg:bg-darkGunmetal lg:flex md:p-1 h-screen">
      <SideBar />

      <div className="flex-1 lg:overflow-y-scroll  lg:pl-[33rem] bg-CharlestonGreen rounded-none md:rounded-md lg:pr-[4.6rem] h-[96%] lg:h-[100%] xl:h-auto overflow-hidden  scroll-bar">
        <div className="lg:flex items-center justify-between mb-[1rem] lg:mb-[3.7rem] mt-[4.5rem] pl-[2rem] pr-[2rem]">
          <div className="lg:mb-[2rem]">
            <p className="text-3xl mb-[1.4rem]  md:text-4xl text-white font-medium md:mb-2">
              Life Goals{" "}
            </p>
            <p className="hidden lg:block text-lightText text-base font-light">
              This Page Is For You To Detaily Make Tasks For Your Self Untill
              Your Next Birthday
            </p>{" "}
          </div>

          {/* mobile  */}
          <div className="lg:hidden">
            <p className="text-base text-lightText font-light mb-[1rem]	">
              This Is All You Need To Follow When Starting Your Day. Start From
              Top To Bottom.Try To Keep 3~5 Items Here
            </p>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="text-base text-white cursor-pointer underline"
            >
              {" "}
              Tutorial
            </a>
          </div>
          {/* lg */}
          <div className="hidden lg:flex">
            <button
              onClick={() => router.push("https://www.youtube.com/")}
              className="border border-white text-sm md:text-base rounded-sm text-white ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]"
            >
              Tutorial
            </button>
          </div>
        </div>
        {/* tags input component */}
        <main className="mb-[4rem] ">
          <div className="bg-darkGunmetal pr-[3.8rem] pl-[2.3rem] lg:pl-[3.8rem] lg:rounded-t-[1.4rem]">
            <div className="text-white text-2xl pt-[2rem] pb-[1.9rem]  lg:text-[1.8rem] flex ">
              <p className="mr-[2.2rem] lg:mr-[4.7rem]">Age</p>
              <p>Achievements</p>
            </div>
          </div>
          {/* chips */}
          <div
            className="bg-Crayola pl-[2rem]  lg:pr-[3.8rem] lg:pl-[3.8rem] lg:rounded-b-[1.4rem] overflow-y-auto h-[79vh] scroll-bar"
            id="chipsWrapper"
          >
            <section className="pt-[2rem] sm:pr-[2rem] pb-[2rem] ">
              {years === 0 ? (
                <p className="text-white text-xl">
                  You Should Set Your Birthday From Setting At First
                </p>
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  {chipsFromAgeArray}
                </DragDropContext>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
