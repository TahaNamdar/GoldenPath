import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import { addChip, removeChip } from "@/app/Redux/featrues/chipSlice";
import { setActiveAge } from "@/app/Redux/featrues/activeAge";
import { trpc } from "@/utils/trpc";

type Props = {
  counter: number;
  daysLeft?: any;
  age?: any;
  index: number;
  chips?: any;
};

function Chip({ age = "", daysLeft = "", counter, index, chips }: Props) {
  const dispatch = useDispatch();
  const updateChipMutation = trpc.updateChips.useMutation();
  const deleteChipMutation = trpc.deleteChips.useMutation();

  const addTags = (event: any) => {
    const currentAge = event.target.name;

    dispatch(setActiveAge(currentAge));

    if (event.key === "Enter" && event.currentTarget.value.trim() !== "") {
      const inputValue = event.currentTarget.value;
      const tagId = uuidv4();

      const chip = { id: tagId, value: inputValue, age: currentAge };

      dispatch(addChip(chip));

      updateChipMutation.mutate({
        age: +currentAge,
        chip,
      });

      event.currentTarget.value = "";
    }
    if (event.key === "Backspace" && event.currentTarget.value === "") {
      // Check if Backspace event corresponds to the correct input field
      if (currentAge === event.currentTarget.name) {
        const lastChip = chips[chips.length - 1];

        if (lastChip) {
          dispatch(removeChip({ id: lastChip.id, age: currentAge }));
          deleteChipMutation.mutate({
            age: +currentAge,
            chipId: lastChip.id,
          });
        }
      } else return;
    }
  };

  return (
    <Droppable
      droppableId={`ROOT-${counter}`}
      type="group"
      direction="horizontal"
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex items-start mb-[1.6rem]"
        >
          <div
            className={`bg-darkGunmetal text-center ${
              counter == age ? "text-white" : "text-placeholder"
            } pr-[1.3rem] pl-[1.3rem] pt-[1.4rem] pb-[1.4rem] lg:pr-[1.7rem] lg:pl-[1.7rem] lg:pt-[1.4rem] lg:pb-[1.4rem] mr-[1.3rem] flex justify-center items-center text-[1.4rem]  lg:text-[1.8rem] rounded-[1.4rem] w-[39px] xl:w-[56px]`}
          >
            {counter}
          </div>
          {/* chip  */}
          <div className="bg-darkGunmetal rounded-[1.4rem] w-4/5 sm:w-full ">
            <div className="pt-[1.2rem] pb-[0.8rem] pl-[1.8rem] relative flex">
              <div className="flex items-center flex-wrap w-11/12 lg:w-10/12  ">
                {chips &&
                  chips.map((chip: any, _index: any) => {
                    return (
                      <Draggable
                        draggableId={chip.id}
                        key={chip.id}
                        index={_index}
                      >
                        {(provided) => (
                          <div
                            className="flex items-center flex-wrap"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div
                              key={_index}
                              className={`bg-chipColor mb-[0.6rem] text-[1.4rem] lg:text-[1.8rem] mr-[0.8rem] lg:mr-[1.6rem] text-black rounded-[3.4rem] pt-[0.2rem] pb-[0.2rem] pr-[0.8rem] pl-[0.8rem] ${
                                chip.value == "" ? "hidden" : "block"
                              }`}
                            >
                              {chip.value}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}

                <input
                  type="text"
                  placeholder="Type to add a goal..."
                  onKeyUp={addTags}
                  name={counter.toString()}
                  className="pr-[1.8rem] text-[1.4rem] lg:text-[1.8rem] w-[14rem] md:w-[unset] bg-darkGunmetal text-placeholder focus:outline-none placeholder-placeholder mb-[0.6rem] "
                />
              </div>
              <div className="hidden text-center md:flex justify-end pr-[0.8rem] md:pr-[2.2rem] md:items-center  w-2/12 lg:ml-[0.6rem]">
                {counter == age ? (
                  <p className="text-white ">{daysLeft} left</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Chip;
