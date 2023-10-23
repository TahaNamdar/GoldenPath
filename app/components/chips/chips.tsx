import React, { useState } from "react";

type Props = {
  counter: number;
  daysLeft?: any;
  age?: any;
};

export default function Chips({ age, daysLeft, counter }: Props) {
  const [tags, setTags] = useState<any[]>([""]);

  const addTags = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
    if (event.key === "Backspace" && event.target.value == "") {
      const copyArr = [...tags];
      copyArr.pop();
      setTags(copyArr);
    }
  };

  return (
    <div className="flex items-start mb-[1.6rem]">
      <div className="bg-darkGunmetal text-center text-white pr-[1.3rem] pl-[1.3rem] pt-[1.4rem] pb-[1.4rem] lg:pr-[1.7rem] lg:pl-[1.7rem] lg:pt-[1.4rem] lg:pb-[1.4rem] mr-[1.3rem] flex justify-center items-center text-[1.4rem]  lg:text-[1.8rem] rounded-[1.4rem]">
        {counter}
      </div>
      {/* chip  */}
      <div className="bg-darkGunmetal rounded-[1.4rem] w-4/5 sm:w-full ">
        <div className="pt-[1.2rem] pb-[0.8rem] pl-[1.8rem] relative flex">
          <div className="flex items-center flex-wrap w-11/12 lg:w-10/12  ">
            {tags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className={`bg-chipColor mb-[0.6rem] text-[1.4rem] lg:text-[1.8rem] mr-[0.8rem] lg:mr-[1.6rem] text-black rounded-[3.4rem] pt-[0.2rem] pb-[0.2rem] pr-[0.8rem] pl-[0.8rem] ${
                    tag == "" ? "hidden" : "block"
                  }`}
                >
                  {tag}
                </div>
              );
            })}
            <input
              type="text"
              placeholder="Type to add a goal..."
              onKeyUp={addTags}
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