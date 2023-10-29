import React, { useState } from "react";

type Props = {
  counter: number;
  daysLeft?: any;
  age?: any;
};

type IChips = {
  age: number;
  tasks: string[];
};

export default function Chips({ age, daysLeft, counter }: Props) {
  const [state, setState] = useState([] as IChips[]);

  const addTags = (event: any) => {
    if (event.key === "Enter" && event.currentTarget.value.trim() !== "") {
      const activeInputAge = Number(event.currentTarget.name);
      const inputValue = event.currentTarget.value;

      setState((prevState) => {
        const updatedState = [...prevState]; // Copy the state
        const existingItem = updatedState.find(
          (item) => item.age === activeInputAge
        );

        if (existingItem) {
          existingItem.tasks.push(inputValue); // Update the tasks array
        } else {
          updatedState.push({
            age: activeInputAge,
            tasks: [inputValue],
          }); // Add a new item if it doesn't exist
        }

        return updatedState;
      });

      event.currentTarget.value = "";
    }
    if (event.key === "Backspace" && event.target.value == "") {
      const activeInputAge = Number(event.currentTarget.name);

      setState((prevState) => {
        const updatedState = prevState.map((item) => {
          if (item.age === activeInputAge) {
            return {
              ...item,
              tasks: item.tasks.slice(0, -1),
            };
          }
          return item;
        });

        return updatedState;
      });
    }
  };

  return (
    <div className="flex items-start mb-[1.6rem]">
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
            {state.map((item, _) =>
              item.tasks.map((task, _index) => {
                return (
                  <div
                    key={_index}
                    className={`bg-chipColor mb-[0.6rem] text-[1.4rem] lg:text-[1.8rem] mr-[0.8rem] lg:mr-[1.6rem] text-black rounded-[3.4rem] pt-[0.2rem] pb-[0.2rem] pr-[0.8rem] pl-[0.8rem] ${
                      task == "" ? "hidden" : "block"
                    }`}
                  >
                    {task}
                  </div>
                );
              })
            )}
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
  );
}
