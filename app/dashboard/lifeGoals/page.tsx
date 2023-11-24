"use client";

import { useEffect } from "react";
import SideBar from "@/app/components/sideBar/sideBar";
import Chip from "@/app/components/chips/chips";
import { DragDropContext } from "react-beautiful-dnd";
import { trpc } from "@/utils/trpc";
import moment from "moment";
import { RootState } from "@/app/Redux/store/store";
import { useSelector } from "react-redux";
import {
  setLifeGoals,
  reorderChips,
  removeFromSourceValue,
  addToDestinationValue,
} from "@/app/Redux/featrues/chipSlice";
import { useDispatch } from "react-redux";
import Loading from "@/app/components/loading/Loading";

export default function LifeGoals() {
  const dispatch = useDispatch();

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

  const limit = years + 7;

  const fetchLifeGoals = trpc.getLifeGoals.useQuery();

  const { data: lifeData, isSuccess, isLoading } = fetchLifeGoals;

  useEffect(() => {
    if (isSuccess) {
      const result = lifeData.slice(0, limit);
      dispatch(setLifeGoals(result));
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  const chipsFromAgeArray = [];

  for (let i = 0; i < limit; i++) {
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

    // 1. get destination age
    const destinationAge = destination.droppableId.split("-")[1];
    // 2. get source age
    const sourceAge = source.droppableId.split("-")[1];
    // 3. get destination value
    const destinationValues = state[destinationAge];

    // 4. get source value
    const sourceValues = state[sourceAge];

    const sourceValue = sourceValues.Chips.find(
      (item: any) => item.id === draggableId
    );

    if (!destination) return;

    //active age
    const activeAge = source.droppableId.split("-")[1];
    //sorting in local age
    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderChips({
          age: activeAge,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );

      updateChipIndexMutation.mutate({
        source_id: sourceValues.id,
        destination_id: destinationValues.id,
        destination_index: destination.index,
        item_id: draggableId,
      });
    }

    //drag and drop between ages
    if (source.droppableId !== destination.droppableId) {
      // 5. remove sourceValue from sourceValues
      dispatch(
        removeFromSourceValue({
          destinationAge: destinationAge,
          sourceValue: sourceValue,
          sourceValues: sourceValues,
        })
      );
      // 6. add sourceValue to destinationValues
      dispatch(
        addToDestinationValue({
          destinationAge: destinationAge,
          sourceValue: sourceValue,
          destinationValues: destinationValues,
        })
      );

      updateChipIndexMutation.mutate({
        source_id: sourceValues.id,
        destination_id: destinationValues.id,
        destination_index: destination.index,
        item_id: draggableId,
      });
    }
  };

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
