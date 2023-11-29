"use client";

import { useEffect, useState } from "react";
import DragSvg from "@/public/assets/Drag.svg";
import SideBar from "@/app/components/sideBar/sideBar";
import GoldenEditor from "@/app/components/goldenEditor/goldenEditor";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";
import { trpc } from "@/utils/trpc";
import { toast } from "react-toastify";
import { Notion, Priority, onFavoriteAdd, onFavoriteRemove, onFavoriteUpdate } from "@/type";

export default function YearlyGoals() {
    const { data: notions, isLoading, error } = trpc.getNotions.useQuery();
    const { data: priorities, isLoading: isPrioritiesLoading } = trpc.getPriorities.useQuery();
    const createNotionCard = trpc.createNotion.useMutation();

    const createPriority = trpc.createPriority.useMutation();
    const removePriority = trpc.removePriority.useMutation();
    const updatePriority = trpc.updatePriority.useMutation();
    const updateNotionsIndex = trpc.updateNotionIndex.useMutation();
    const updatePrioritiesIndex = trpc.updatePrioritiesIndex.useMutation();

    const [notionsList, setNotionsList] = useState<Notion[]>([]);
    const [prioritiesList, setPriorities] = useState<Priority[]>([]);

    const [isShown, setIsShown] = useState<boolean>(false);

    const onFavoriteAdd: onFavoriteAdd = ({ notionId, taskId, value }) => {
        createPriority.mutate(
            { notionId, taskId, value },
            {
                onSuccess: (res) => {
                    if (prioritiesList.length > 5) return;
                    const { id, userId, index } = res;
                    const newPriority: Priority = { id, userId, notionId, taskId, value, index };
                    setPriorities((_prev) => {
                        return [..._prev, newPriority];
                    });
                },
            }
        );
    };
    const onFavoriteRemove: onFavoriteRemove = ({ taskId }) => {
        const priority = prioritiesList.filter((priority) => priority.taskId === taskId);

        if (!priority) return;

        const { id } = priority[0];

        removePriority.mutate(
            {
                priorityId: id,
            },
            {
                onSuccess: () => {
                    setPriorities((_prev) => {
                        const filteredPriority = _prev.filter((_priority) => _priority.id !== id);
                        return [...filteredPriority];
                    });
                },
            }
        );
    };

    const onFavoriteUpdate: onFavoriteUpdate = ({ taskId, value }) => {
        updatePriority.mutate(
            {
                taskId,
                value,
            },
            {
                onSuccess: () => {
                    setPriorities((_prev) => {
                        const modifiedValues = _prev.map((_priority) => {
                            if (_priority.taskId === taskId) {
                                _priority.value = value;
                            }
                            return _priority;
                        });

                        return [...modifiedValues];
                    });
                },
            }
        );
    };

    const handleAddComponent = () => {
        createNotionCard.mutate(
            { title: "" },
            {
                onSuccess: (res: Notion) => {
                    setNotionsList((notions) => {
                        return [...notions, res];
                    });
                },
                onError: (err: any) => {
                    toast.error("Something's went wrong. Cannot create a Dimention right now. ");
                    console.error(err);
                },
            }
        );
    };

    useEffect(() => {

        if (!notions || notions.length === 0) {
            setNotionsList([]);
        } else {
            // we sort arrays based on their index on the database
            const sortedNotions = (notions as Notion[]).sort((a, b) => a.index - b.index);
            setNotionsList(sortedNotions);
        }
    }, [notions]);

    useEffect(() => {
        if (!notions || notions.length === 0) {
            setPriorities([]);
        } else {
            const prioritiesSorted = (priorities as Priority[]).sort((a, b) => a.index - b.index);
            setPriorities(prioritiesSorted.slice(0, 6));
        }
    }, [priorities]);

    return (
        <div className="bg-CharlestonGreen lg:bg-darkGunmetal lg:flex md:p-1">
            {/* SideBar */}
            <SideBar />
            {/* Yearly Goals */}

            <div className="flex-1  bg-CharlestonGreen rounded-md pl-[2rem] pr-[2rem] md:pl-[3.7rem] md:pr-[4.6rem] h-auto pb-[60px] lg:pb-[unset]">
                <div className="lg:flex items-center justify-between mb-[3.7rem] mt-[4.5rem]">
                    <div>
                        <p className="text-3xl mb-[1.4rem]  md:text-4xl text-white font-medium md:mb-2">Yearly Goals</p>
                        <p className="hidden lg:block text-lightText text-base font-light">this page is for you to detaily make tasks for your self untill your next birthday</p>{" "}
                    </div>

                    {/* mobile  */}
                    <div className="lg:hidden">
                        <p className="text-base text-lightText font-light mb-[1rem]	">this is all you need to follow when starting your day. start from top to bottom.try to keep 3~5 items here</p>

                        <a className="text-base text-white mr-[1.5rem] cursor-pointer underline">26 Y.O Goals</a>
                        <a className="text-base text-white cursor-pointer underline"> Tutorial</a>
                    </div>

                    {/* lg */}
                    <div className="hidden lg:flex">
                        <button className="border border-white text-sm md:text-base rounded-sm text-white pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]  md:pt-[0.4rem] md:pb-[0.4rem] md:pr-[2.3rem] md:pl-[2.3rem]  ">26 Y.O Goals</button>
                        <button className="border border-white text-sm md:text-base rounded-sm text-white ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">Tutorial</button>
                    </div>
                </div>
                {/* Priorities */}
                <div className="bg-Crayola p-10 mb-[4rem] md:pl-[3.6rem] md:pb-[7.9rem] md:pt-[3.2rem] rounded-md ">
                    <p className="text-3xl md:text-4xl font-medium md:mb-[0.1rem] text-white">Priorities</p>
                    <p className="text-lightText font-light md:text-white text-xl mb-[3.4rem]">this is all you need to follow when starting your day. start from top to bottom.try to keep 3~5 items here</p>

                    <ReactSortable
                        onEnd={(e) => {
                            const from = e.oldIndex as number;
                            const to = e.newIndex as number;

                            const { id: sourceId } = prioritiesList[from];
                            const { id: destinationId } = prioritiesList[to];

                            updatePrioritiesIndex.mutate({
                                destinationId,
                                sourceId,
                                from,
                                to,
                            });
                        }}
                        list={prioritiesList}
                        setList={setPriorities}
                        animation={200}
                        className="md:flex md:flex-wrap"
                    >
                        {isPrioritiesLoading ? (
                            <p className="text-[16px] text-white">fetching data...</p>
                        ) : prioritiesList.length === 0 ? (
                            <p className="text-[16px] text-placeholder">Add a task to your favorite to see them here</p>
                        ) : (
                            prioritiesList &&
                            prioritiesList.length &&
                            prioritiesList.map((item, index) => {
                                return (
                                    <div className="md:w-1/2 cursor-grab" key={item.taskId}>
                                        <div className="flex items-center mb-[1.6rem]" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                                            <div className="p-4 text-center bg-darkGunmetal mr-[1rem] rounded-large  pt-[1.1rem] pb-[1.1rem] md:p-[2rem]  pr-[1.1rem] pl-[1.1rem] w-[5.4rem] text-2xl text-white">{index + 1}</div>
                                            <div className="rounded-[1.4rem]  bg-darkGunmetal w-full md:w-9/12 xl:w-10/12 ">
                                                <div className="pl-[1rem] md:pl-[2.2rem] flex items-center">
                                                    {isShown ? (
                                                        <div>
                                                            <DragSvg />{" "}
                                                        </div>
                                                    ) : (
                                                        <div className="w-[1.1rem]"></div>
                                                    )}
                                                    <p className="text-gold font-normal text-[1.3rem] md:text-2xl pt-[1.3rem] ml-[2.1rem] pb-[1.3rem] sm:pr-[16rem] md:pt-[1.8rem] md:ml-[1.7rem] md:pb-[1.5rem] md:pr-[0.4rem] lg:pt-[2rem] lg:ml-[2.1rem] lg:pb-[2.1rem] lg:pr-[0]">{item.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </ReactSortable>
                </div>
                {/* Activities */}
                <div className="md:flex items-center justify-between mb-[1.6rem] mt-[4.5rem]">
                    <div>
                        <p className="text-3xl mb-[1.4rem]  md:text-4xl text-white font-medium md:mb-2">life Dimensions </p>
                        <p className="hidden lg:block text-lightText text-base font-light">this is all you need to follow when starting your day. start from top to bottom.try to keep 3~5 items here"</p>{" "}
                    </div>
                </div>
                {/* notion */}

                {isLoading ? (
                    <p className="text-[16px] text-white">fetching data...</p>
                ) : (
                    <div>
                        <ReactSortable
                            onEnd={(e) => {
                                const from = e.oldIndex as number;
                                const to = e.newIndex as number;

                                const { id: sourceId } = notionsList[from];
                                const { id: destinationId } = notionsList[to];

                                updateNotionsIndex.mutate({
                                    destinationId,
                                    sourceId,
                                    from,
                                    to,
                                });
                            }}
                            list={notionsList}
                            setList={setNotionsList}
                            animation={200}
                            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-4"
                        >
                            {/* render notion cards here */}
                            {notionsList.map((notion: Notion) => {
                                return <GoldenEditor data={notion} key={notion.id} onFavoriteAdd={onFavoriteAdd} onFavoriteRemove={onFavoriteRemove} onFavoriteUpdate={onFavoriteUpdate} />;
                            })}

                            <div className="bg-Crayola cursor-pointer rounded-[14px] mb-[9rem] md:mb-[unset] p-10 text-white w-full  lg:w-11/12 h-[160px] lg:h-[190px] 3xl:mr-[20px] lg:mb-[20px]" onClick={handleAddComponent}>
                                <p className="text-editor text-[20px]  mb-[6px]">Add Dimension</p>
                                <p className="text-editor text-[16px]">Tap here to add a new dimension, such as University, Health, Bussiness etc...</p>
                            </div>
                        </ReactSortable>
                    </div>
                )}
            </div>
        </div>
    );
}
