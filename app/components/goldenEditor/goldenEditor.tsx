"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GoldenRate from "@/public/assets/layout/RatingGold.svg";
import Rate from "@/public/assets/layout/Rating.svg";
import DragIcon from "@/public/assets/layout/dragIcon.svg";

import { v4 as uuidv4 } from "uuid";

type Tasks = {
  id: any;
  value: string;
  checked: boolean;
  isFavorite: boolean;
  visible: boolean;
  subTask: boolean;
};

interface Input {
  id: any;
  title: string;
  tasks: Tasks[];
}

// 1. set blur on title => create notion with title as props

const GoldenEditor = ({
  onFavoriteHandler,
}: {
  onFavoriteHandler: (id: any, text: string, isFavorite: boolean) => void;
}) => {
  const uniqueId = uuidv4();
  const ID = uuidv4();

  const [inputs, setInputs] = useState<Input[]>([
    {
      id: uniqueId,
      title: "",
      tasks: [
        {
          id: ID,
          value: "",
          checked: false,
          isFavorite: false,
          visible: false,
          subTask: false,
        },
      ],
    },
  ]); // Initial
  const newInputRef = useRef<HTMLInputElement>(null);

  const [backSpace, setBackSpace] = useState<boolean>(false);
  const [focusOnTitle, setFocusOnTitle] = useState<boolean>(false);

  const tasks = inputs.flatMap((input) => input.tasks);

  useEffect(() => {
    if (focusOnTitle) return;
    if (!backSpace) {
      if (newInputRef.current) {
        newInputRef.current.focus();
      }
    }
  }, [tasks, backSpace, inputs, focusOnTitle]); // Focus the new input whenever inputs change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocusOnTitle(true);
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        return {
          ...input,
          title: e.target.value,
        };
      });
    });
  };

  const handleKeyDown = (e: any, ID: number) => {
    setFocusOnTitle(false);

    const currentInput = inputs.map((input) => {
      const findInput = input.tasks.find((item: any) => item.id === ID);
      return findInput;
    });

    const inputLengthValueHandler = inputs.flatMap((input) => input.tasks);

    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      inputLengthValueHandler.length < 5
    ) {
      e.preventDefault(); // Prevent the default behavior (submitting the form)

      setBackSpace(false);

      currentInput.map((item) => {
        if (item?.value.trim() !== "") {
          setInputs((prevInputs) => {
            return prevInputs.map((item) => {
              return {
                ...item,
                tasks: [
                  ...item.tasks,
                  {
                    id: uniqueId,
                    value: "",
                    checked: false,
                    isFavorite: false,
                    visible: false,
                    subTask: false,
                  },
                ],
              };
            });
          });
        }
      });
    }

    if (e.key === "Tab" && e.target.value !== "") {
      e.preventDefault(); // Prevent default behavior

      setInputs((prevInputs) => {
        return prevInputs.map((item) => {
          return {
            ...item,
            tasks: item.tasks.map((task) => {
              if (task.id === ID && task.value.trim() !== "") {
                return {
                  ...task,
                  subTask: !task.subTask,
                };
              }
              return task;
            }),
          };
        });
      });
    }

    if (e.key === "Backspace") {
      setBackSpace(true);
    }

    if (e.key === "Backspace" && e.target.value == "") {
      setInputs((prevInputs) => {
        return prevInputs.map((item) => {
          return {
            ...item,
            tasks: item.tasks.map((task) => {
              if (task.id === ID) {
                return {
                  ...task,
                  subTask: false,
                };
              }
              return task;
            }),
          };
        });
      });

      const updatedInputs = inputs.map((input) => {
        const updatedTasks = input.tasks.filter((task) => task.id !== ID);
        return {
          ...input,
          tasks: updatedTasks,
        };
      });

      inputs.map((input) => {
        input.tasks.map((_, index) => {
          if (index == 0) return;
          else {
            setInputs(updatedInputs);
          }
        });
      });
    }
  };

  const handleChecked = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((item) => {
        return {
          ...item,
          tasks: item.tasks.map((task) => {
            if (task.id === id && task.value.trim() !== "") {
              return {
                ...task,
                checked: !task.checked,
              };
            }
            return task;
          }),
        };
      });
    });
  };

  const handleVisibleShow = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((item) => {
        return {
          ...item,
          tasks: item.tasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                visible: true,
              };
            }
            return task;
          }),
        };
      });
    });
  };

  const handleVisibleHide = (id: number) => {
    setInputs((prevInputs: any) => {
      return prevInputs.map((item: any) => {
        return {
          ...item,
          tasks: item.tasks.map((task: any) => {
            if (task.id === id) {
              return {
                ...task,
                visible: false,
              };
            }
            return task;
          }),
        };
      });
    });
  };

  const favoriteHandler = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((item) => {
        return {
          ...item,
          tasks: item.tasks.map((task) => {
            if (task.id === id && task.value.trim() !== "") {
              onFavoriteHandler(task.id, task.value, task.isFavorite);
              return {
                ...task,
                isFavorite: !task.isFavorite,
              };
            }
            return task;
          }),
        };
      });
    });
  };

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      source.draggableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Handle group reordering
    if (type === "group") {
      const newArray = inputs.flatMap((input) => input.tasks);
      const reorderedStores = [...newArray];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);

      setInputs((prevInputs: any) => {
        return prevInputs.map((item: any) => {
          return {
            ...item,
            tasks: reorderedStores,
          };
        });
      });
    }
  };

  const getClassName = (input: any) => {
    let className = "";

    if (input.isFavorite === true) {
      className += "text-gold ";
    }

    if (input.checked) {
      className +=
        "line-through placeholder-editor text-editor text-[16px] w-[90%] bg-transparent outline-none mr-[6px] ";
    } else {
      className +=
        "placeholder-placeholder bg-transparent  outline-none text-[16px] w-[90%] mr-[6px] ";
    }

    if (input.subTask === true) {
      className += "pl-[20px]";
    } else {
      className += "pl-[0px]";
    }

    return className;
  };

  return (
    <div className="bg-Crayola rounded-[14px] p-10 text-white w-full lg:w-11/12 h-[240px] 3xl:h-[299px]  mb-[20px]">
      <input
        type="text"
        placeholder="Choose Title"
        className="placeholder-placeholder bg-transparent outline-none text-3xl mb-[6px]"
        onChange={handleInputChange}
      />
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="Editor" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {inputs.map((item: any, i: number) =>
                item.tasks.map((input: any, index: number) => {
                  return (
                    <Draggable
                      draggableId={input.id.toString()}
                      key={input.id}
                      index={index}
                    >
                      {(provided) => {
                        const isVisible = input.visible; // Assuming input.visible controls visibility
                        return (
                          <div
                            key={input.id}
                            className="flex items-center mb-3  p-2"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            onMouseEnter={() => handleVisibleShow(input.id)}
                            onMouseLeave={() => handleVisibleHide(input.id)}
                          >
                            <div
                              className={`${
                                isVisible ? "md:visible" : "hidden"
                              } mr-[10px]`}
                            >
                              <DragIcon />
                            </div>

                            <label
                              className={` mr-4  containerCheckbox cursor-pointer `}
                            >
                              <input
                                checked={input.checked}
                                type="checkbox"
                                onChange={() => handleChecked(input.id)}
                              />{" "}
                              <span
                                className={`${
                                  isVisible ? "visible" : "hidden"
                                } checkmark `}
                              ></span>
                            </label>

                            <input
                              tabIndex={i}
                              type="text"
                              ref={i === inputs.length - 1 ? newInputRef : null}
                              value={input.value}
                              placeholder="Write New Dimension"
                              style={{ whiteSpace: "pre-wrap" }}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setInputs((prevInputs) => {
                                  return prevInputs.map((item) => {
                                    return {
                                      ...item,
                                      tasks: item.tasks.map((task) => {
                                        if (task.id === input.id) {
                                          return {
                                            ...task,
                                            value: e.target.value,
                                          };
                                        }
                                        return task;
                                      }),
                                    };
                                  });
                                });
                              }}
                              onKeyDown={(e) => handleKeyDown(e, input.id)}
                              className={getClassName(input)}
                            />
                            <div
                              className={`${isVisible ? "visible" : "hidden"}`}
                              onClick={() => favoriteHandler(input.id)}
                            >
                              <div className="cursor-pointer">
                                {input.isFavorite ? <GoldenRate /> : <Rate />}
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GoldenEditor;
