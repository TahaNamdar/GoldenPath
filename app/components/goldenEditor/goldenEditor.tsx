"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Input {
  id: number;
  value: string;
  title: string;
  checked: boolean;
  isFavorite: boolean;
}

const GoldenEditor = () => {
  const [inputs, setInputs] = useState<Input[]>([
    { id: Date.now(), value: "", title: "", checked: false, isFavorite: false },
  ]); // Initial
  const newInputRef = useRef<HTMLInputElement>(null);

  const [backSpace, setBackSpace] = useState<boolean>(false);
  const [focusOnTitle, setFocusOnTitle] = useState<boolean>(false);

  useEffect(() => {
    if (!backSpace || !focusOnTitle) {
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior (submitting the form)
      const currentInput = inputs.find((input: any) => input.id === ID);
      setBackSpace(false);
      setFocusOnTitle(false);
      if (currentInput?.value.trim() !== "") {
        const newInput = {
          id: Date.now(),
          value: "",
          title: "",
          checked: false,
          isFavorite: false,
        };
        setInputs([...inputs, newInput]);
      }
    }
    if (e.key === "Backspace" && e.target.value == "") {
      const filteredArray = inputs.filter((item: any, _) => item.id !== ID);
      setInputs(filteredArray);
    }
    if (e.key === "Backspace") {
      setBackSpace(true);
    }
  };

  const handleChecked = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            checked: !input.checked,
          };
        }
        return input;
      });
    });
  };

  const favoriteHandler = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
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
    <div className="bg-darkGunmetal rounded-sm p-10 text-white w-[200px] h-[200px]">
      <DragDropContext onDragEnd={handleDragDrop}>
        <input
          type="text"
          placeholder="title"
          className="placeholder-white bg-transparent outline-none text-3xl"
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
                  {(provided) => (
                    <div
                      key={input.id}
                      className="flex items-center mb-3 bg-black p-2"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <input
                        checked={input.checked}
                        type="checkbox"
                        className="mr-4"
                        onChange={() => handleChecked(input.id)}
                      />
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
                        className={
                          input.checked
                            ? "line-through placeholder-white bg-transparent outline-none"
                            : "placeholder-white bg-transparent outline-none"
                        }
                      />
                      <h1 onClick={() => favoriteHandler(input.id)}>Star</h1>
                    </div>
                  )}
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
