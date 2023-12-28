"use client";

import React, { useState, useRef, useEffect, ChangeEvent, useDeferredValue } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { trpc } from "@/utils/trpc";
import { useDebouncedCallback } from "use-debounce";
import TaskCard from "./TaskCard";
import { Notion, NotionTask, onFavoriteAdd, onFavoriteRemove, onFavoriteUpdate } from "@/type";
import TextareaAutosize from "react-textarea-autosize";

const GoldenEditor = ({ data, onFavoriteAdd, onFavoriteRemove, onFavoriteUpdate, onRemoveNotionCard }: { data: Notion; onFavoriteAdd: onFavoriteAdd; onFavoriteRemove: onFavoriteRemove; onFavoriteUpdate: onFavoriteUpdate; onRemoveNotionCard: any }) => {
    const addTaskRef = useRef<HTMLTextAreaElement>(null);

    // copy notion prop
    const [notion, setNotion] = useState<Notion>({ ...data });
    const [title, setTitle] = useState<string>(notion.title);
    const [isSubTask, setIsSubTask] = useState(false);

    const updateTitleMutation = trpc.updateNotionTitle.useMutation();
    const { mutate: createNewTask, isLoading: isCreatingNewTask } = trpc.createTask.useMutation();
    const updateNotionTaskIndex = trpc.updateNotionTasksIndex.useMutation();
    const { mutate: deleteNotion } = trpc.deleteNotion.useMutation();

    const updateTitleMutationDebounced = useDebouncedCallback((id: string, title: string) => {
        updateTitleMutation.mutate({ id, title });
    }, 500);

    const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _title = e.target.value;
        const _id = notion.id;

        setTitle(e.target.value);
        updateTitleMutationDebounced(_id, _title);
    };

    const reorder = (list: NotionTask[], startIndex: number, endIndex: number) => {
        const _arr = [...list];
        const [removed] = _arr.splice(startIndex, 1);
        _arr.splice(endIndex, 0, removed);

        return _arr;
    };

    const getSubtasks = (tasks: NotionTask[], index: number) => {
        if (tasks[index].subTask) return [];

        const subTasks: NotionTask[] = [];
        for (let i = index + 1; i < tasks.length; i++) {
            const task = tasks[i];

            if (!task.subTask) {
                break;
            }

            subTasks.push(task);
        }

        return subTasks;
    };

    const handleDragDrop = (result: any) => {
        if (!result.destination) return;

        const tasks = [...notion.Tasks];
        const sourceIndex: number = result.source.index;
        const destinationIndex: number = result.destination.index;
        const draggedTask = tasks[sourceIndex];

        let reOrderedTasks = reorder(tasks, result.source.index, result.destination.index);

        // 1. if the given task has sub tasks, they need to be dragged too
        const subTasks = getSubtasks(tasks, sourceIndex);

        draggedTask.subTask = false;

        // 2. if a task drops before a sub-task it becomes a sub task
        if (subTasks.length === 0 && (tasks[destinationIndex + 1]?.subTask || tasks[destinationIndex].subTask)) {
            draggedTask.subTask = true;
        }

        // reorder subtasks if there is any
        if (subTasks.length) {
            let temp_index = 1;
            subTasks.forEach((task) => {
                if (destinationIndex < sourceIndex) {
                    reOrderedTasks = reorder(reOrderedTasks, result.source.index + temp_index, result.destination.index + temp_index);
                    temp_index += 1;
                } else {
                    reOrderedTasks = reorder(reOrderedTasks, result.source.index, result.destination.index);
                }
            });
        }

        updateNotionTaskIndex.mutate({
            notionId: notion.id,
            tasks: reOrderedTasks,
        });

        setNotion((prev) => {
            return {
                ...prev,
                Tasks: [...reOrderedTasks],
            };
        });
    };

    const onNewDimensionHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }

        if (e.key === "Backspace") {
            if (!isSubTask) return;
            setIsSubTask(false);
        }

        if (e.altKey) {
            e.preventDefault();
            setIsSubTask(false);
        }

        if (e.key === "Tab") {
            if (isSubTask) return;
            e.preventDefault();
            setIsSubTask(true);
        }

        if (e.key !== "Enter") return;

        const value = e.currentTarget.value;
        createNewTask(
            {
                is_sub: isSubTask,
                notionId: notion.id,
                value,
            },
            {
                onSuccess: (res) => {
                    const { id } = res;
                    setNotion((_notion) => {
                        const newTask = {
                            id,
                            checked: false,
                            isFavorite: false,
                            subTask: isSubTask,
                            value,
                            visible: false,
                        };
                        return {
                            ..._notion,
                            Tasks: [..._notion.Tasks, newTask],
                        };
                    });

                    addTaskRef.current!.value = "";
                    addTaskRef.current!.focus();
                },
            }
        );
    };

    const onTaskRemoved = (taskId: string) => {
        setNotion((_notion) => {
            const filterTasks = notion.Tasks.filter((task) => task.id !== taskId);

            if (filterTasks.length == 0) {
                deleteNotion(
                    { id: notion.id },
                    {
                        onSuccess: () => {
                            onRemoveNotionCard(notion.id);
                        },
                    }
                );
            }

            return {
                ..._notion,
                Tasks: [...filterTasks],
            };
        });
    };
    return (
        <div className="bg-Crayola rounded-[14px] p-10 text-white w-full lg:w-11/12 h-[240px] 3xl:h-[299px]  mb-[20px] cursor-grab">
            <input type="text" value={title} placeholder="Choose Title" className="placeholder-placeholder bg-transparent outline-none text-3xl mb-[6px]" onChange={titleOnChangeHandler} />

            <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId={notion.id} type="group">
                    {(provided) => (
                        <div className="h-[91%] overflow-auto scroll-bar" {...provided.droppableProps} ref={provided.innerRef}>
                            {notion.Tasks.map((task: NotionTask, index: number) => {
                                return (
                                    <Draggable draggableId={task.id} key={task.id} index={index}>
                                        {(provided) => {
                                            return (
                                                <div key={task.id} className="flex items-center mb-3" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                    <TaskCard onTaskRemoved={onTaskRemoved} notionId={notion.id} data={task} onFavoriteAdd={onFavoriteAdd} onFavoriteRemove={onFavoriteRemove} onFavoriteUpdate={onFavoriteUpdate} />
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                );
                            })}

                            <section className="flex">
                                <div className="mr-[21px]"></div>
                                <label className={` mr-4 containerCheckbox cursor-pointer `}>
                                    <input type="checkbox" /> <span className={` checkmark `}></span>
                                </label>

                                <TextareaAutosize
                                    ref={addTaskRef}
                                    placeholder="Write New Dimension"
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        resize: "none",
                                        paddingLeft: `${isSubTask ? "12px" : "0px"}`,
                                    }}
                                    className="placeholder-placeholder bg-transparent overflow-hidden  outline-none text-[14px] w-[90%] mr-[6px]"
                                    onKeyDown={onNewDimensionHandler}
                                />
                            </section>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default GoldenEditor;
