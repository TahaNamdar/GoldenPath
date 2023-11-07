import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store/store";
import {
  addChip,
  removeChip,
  updateInput,
} from "@/app/Redux/featrues/chipSlice";

type Props = {
  counter: number;
  daysLeft?: any;
  age?: any;
  index: number;
};

function Chip({ age, daysLeft, counter, index }: Props) {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.chip); // Assuming "chip" is the slice name

  const addTags = (event: any) => {
    const activeInput = event.currentTarget.name;

    if (event.key === "Enter" && event.currentTarget.value.trim() !== "") {
      const inputValue = event.currentTarget.value;
      const tagId = uuidv4();

      dispatch(addChip({ id: tagId, value: inputValue, age: activeInput }));

      event.currentTarget.value = "";
    }

    if (event.key === "Backspace" && event.currentTarget.value == "") {
      const filtered = tasks.find((task) => task.age === activeInput);

      if (filtered) {
        const lastChip = tasks[tasks.length - 1];

        if (lastChip) {
          dispatch(removeChip(lastChip.id));
        }
      }
    }
  };

  const handleInputChange = (id: string, value: string) => {
    dispatch(updateInput({ id, value }));
  };

  return (
    <Droppable
      droppableId={`ROOT-${index}`}
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
                {tasks.map((task, _index) => {
                  if (task.age == counter) {
                    return (
                      <Draggable
                        draggableId={_index.toString()}
                        key={_index}
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
                                task.value == "" ? "hidden" : "block"
                              }`}
                            >
                              {task.value}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}

                <input
                  type="text"
                  placeholder="Type to add a goal..."
                  onKeyUp={addTags}
                  name={counter.toString()}
                  onChange={(e) =>
                    handleInputChange(counter.toString(), e.target.value)
                  }
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
