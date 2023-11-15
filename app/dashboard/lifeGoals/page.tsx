"use client";

import { useEffect } from "react";
import SideBar from "@/app/components/sideBar/sideBar";
import Chip from "@/app/components/chips/chips";
import { DragDropContext } from "react-beautiful-dnd";
import { trpc } from "@/utils/trpc";
import moment from "moment";
import { RootState } from "@/app/Redux/store/store";
import { useSelector } from "react-redux";
import { activeAgeFromStore } from "@/app/Redux/featrues/activeAge";
import { reorderChips, changeAge } from "@/app/Redux/featrues/chipSlice";
import { useDispatch } from "react-redux";

type DraggableResult = {
    droppableId: string;
    index: number;
};

export default function LifeGoals() {
    const dispatch = useDispatch();

    const state = useSelector((state: RootState) => state.chip); // Assuming "chip" is the slice name
    const activeAge = useSelector(activeAgeFromStore);

    const fetchOneUser = trpc.getOneUser.useQuery();
    trpc.getLifeGoals.useQuery({
        onSuccess: (data: any) => {
          // update redux value with new values from server
            console.log(data);
        },
    });

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
        chipsFromAgeArray.push(<Chip key={i} counter={i + 1} daysLeft={days} age={years} index={i} data={state[i]} />);
    }

    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;

        /*



        1. add value to destination age
        2. remove value from source age

        updateChips({age: destination.age, chip: source.value })
        deleteChips({age: source.age, id: "sdygasdyugasdyugsdyuags"})

      
        */

        const sourceIndex = (source as DraggableResult).index;
        const destinationIndex = (destination as DraggableResult).index;

        const dropArea = destination.droppableId.split("-")[1];

        const draggableTaskId = state[sourceIndex].id;

        if (source.droppableId !== destination.droppableId) {
            dispatch(changeAge({ id: draggableTaskId, newAge: dropArea }));
        }

        if (source.droppableId === destination.droppableId) {
            dispatch(
                reorderChips({
                    sourceIndex: sourceIndex,
                    destinationIndex: destinationIndex,
                })
            );
        }
    };

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div className=" bg-CharlestonGreen lg:bg-darkGunmetal lg:flex md:p-1">
            <SideBar />

            <div className="flex-1  bg-CharlestonGreen rounded-md lg:pl-[3.7rem] lg:pr-[4.6rem] h-screen xl:h-auto">
                <div className="lg:flex items-center justify-between mb-[1rem] lg:mb-[3.7rem] mt-[4.5rem] pl-[2rem] pr-[2rem]">
                    <div className="lg:mb-[2rem]">
                        <p className="text-3xl mb-[1.4rem]  md:text-4xl text-white font-medium md:mb-2">Life Goals </p>
                        <p className="hidden lg:block text-lightText text-base font-light">this page is for you to detaily make tasks for your self untill your next birthday</p>{" "}
                    </div>

                    {/* mobile  */}
                    <div className="lg:hidden">
                        <p className="text-base text-lightText font-light mb-[1rem]	">this is all you need to follow when starting your day. start from top to bottom.try to keep 3~5 items here</p>

                        <a className="text-base text-white cursor-pointer underline"> Tutorial</a>
                    </div>
                    {/* lg */}
                    <div className="hidden lg:flex">
                        <button className="border border-white text-sm md:text-base rounded-sm text-white ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">Tutorial</button>
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
                            <DragDropContext onDragEnd={onDragEnd}>{chipsFromAgeArray}</DragDropContext>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
