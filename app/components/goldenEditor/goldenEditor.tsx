"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GoldenRate from "@/public/assets/layout/RatingGold.svg";
import Rate from "@/public/assets/layout/Rating.svg";
import DragIcon from "@/public/assets/layout/dragIcon.svg";

import { v4 as uuidv4 } from "uuid";

interface Input {
  id: any;
  value: string;
  title: string;
  checked: boolean;
  isFavorite: boolean;
  visible: boolean;
  subTask: boolean;
}

const GoldenEditor = ({
  onFavoriteHandler,
}: {
  onFavoriteHandler: (id: any, text: string) => void;
}) => {
  const uniqueId = uuidv4();

  const [inputs, setInputs] = useState<Input[]>([
    {
      id: uniqueId,
      value: "",
      title: "",
      checked: false,
      isFavorite: false,
      visible: false,
      subTask: false,
    },
  ]); // Initial
  const newInputRef = useRef<HTMLInputElement>(null);

  const [backSpace, setBackSpace] = useState<boolean>(false);
  const [focusOnTitle, setFocusOnTitle] = useState<boolean>(false);

  useEffect(() => {
    if (focusOnTitle) return;
    if (!backSpace) {
      if (newInputRef.current) {
        newInputRef.current.focus();
      }
    }
  }, [inputs, backSpace, focusOnTitle]); // Focus the new input whenever inputs change

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

    if (e.key === "Enter" && !e.shiftKey && inputs.length < 5) {
      e.preventDefault(); // Prevent the default behavior (submitting the form)
      const currentInput = inputs.find((input: any) => input.id === ID);
      setBackSpace(false);
      if (currentInput?.value.trim() !== "") {
        const newInput = {
          id: uniqueId,
          value: "",
          title: "",
          checked: false,
          isFavorite: false,
          visible: false,
          subTask: false,
        };
        setInputs([...inputs, newInput]);
      }
    }

    if (e.key === "Tab" && e.target.value !== "") {
      e.preventDefault(); // Prevent default behavior
      setInputs((prevInputs) => {
        return prevInputs.map((input) => {
          if (input.id === ID) {
            return {
              ...input,
              subTask: !input.subTask,
            };
          }
          return input;
        });
      });
    }

    inputs.map((_, index) => {
      if (index == 0) {
        return;
      }
      if (e.key === "Backspace" && e.target.value == "") {
        setInputs((prevInputs) => {
          return prevInputs.map((input) => {
            if (input.id === ID) {
              return {
                ...input,
                subTask: false,
              };
            }
            return input;
          });
        });

        const filteredArray = inputs.filter((item: any, _) => item.id !== ID);
        setInputs(filteredArray);
      }
    });

    if (e.key === "Backspace") {
      setBackSpace(true);
    }
  };

  const handleChecked = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id && input.value.trim() !== "") {
          return {
            ...input,
            checked: !input.checked,
          };
        }
        return input;
      });
    });
  };

  const handleVisibleShow = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            visible: true,
          };
        }
        return input;
      });
    });
  };

  const handleVisibleHide = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            visible: false,
          };
        }
        return input;
      });
    });
  };

  const favoriteHandler = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id && input.value.trim() !== "") {
          onFavoriteHandler(input.id, input.value);
          return {
            ...input,
            isFavorite: !input.isFavorite,
          };
        }
        return input;
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

    if (type === "group") {
      const reorderedStores = [...inputs];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);

      return setInputs(reorderedStores);
    }
  };

  return (
    <div className="bg-Crayola rounded-[14px] p-10 text-white 3xl:w-[350px] 3xl:h-[299px] ">
      <DragDropContext onDragEnd={handleDragDrop}>
        <input
          type="text"
          placeholder="title"
          className="placeholder-white bg-transparent outline-none text-3xl mb-[6px]"
          onChange={handleInputChange}
        />
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {inputs.map((input: any, index: number) => (
                <Draggable
                  draggableId={input.id.toString()}
                  key={input.id}
                  index={index}
                >
                  {(provided) => {
                    const isVisible = input.visible; // Assuming input.visible controls visibility
                    const subTask = input.subTask;
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
                            isVisible ? "visible" : "hidden"
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
                          tabIndex={index}
                          type="text"
                          ref={index === inputs.length - 1 ? newInputRef : null}
                          value={input.value}
                          placeholder="text"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const updatedInputs = inputs.map((i: any) =>
                              i.id === input.id
                                ? { ...i, value: e.target.value }
                                : i
                            );
                            setInputs(updatedInputs);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, input.id)}
                          className={`
                            ${
                              input.checked
                                ? "line-through placeholder-white w-[90%] bg-transparent outline-none mr-[6px] "
                                : "placeholder-white bg-transparent outline-none w-[90%] mr-[6px]"
                            }
                            ${
                              input.isFavorite === true
                                ? "text-gold"
                                : "text-white"
                            }
                            ${subTask === true ? "pl-[20px]" : "pl-[0px]"}
                          `}
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
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GoldenEditor;
