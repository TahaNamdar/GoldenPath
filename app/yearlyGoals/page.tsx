"use client";

export default function YearlyGoals() {
  return (
    <div className="h-screen bg-lightBlue md:flex p-1">
      <div className="md:w-2/12 bg-lightBlue"></div>
      <div className="md:w-10/12 bg-smoke rounded-3xl md:pl-[3.7rem] md:pr-[4.6rem]">
        {/* Yearly Goals */}
        <div className="flex items-center justify-between md:mb-[3.7rem] md:mt-[4.5rem]">
          <p className="text-4xl text-blueViolet font-medium mb-2">
            Yearly Goals
          </p>
          <div>
            <button className="border border-lavender text-base rounded-sm text-lavender pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              26 Y.O Goals
            </button>
            <button className="border border-lavender text-base rounded-sm text-lavender ml-[1.6rem] pt-[1.2rem] pb-[1.2rem] pr-[2.3rem] pl-[2.3rem]">
              Tutorial
            </button>
          </div>
        </div>
        {/* Priorities */}

        <div className="bg-white md:pl-[3.6rem] md:pt-[3.2rem] rounded-md">
          <p className="text-4xl font-medium md:mb-[0.1rem] text-blueViolet">
            Priorities
          </p>
          <p className="text-blueViolet text-xl md:mb-[3.4rem]">
            this is all you need to follow when starting your day. start from
            top to bottom.
          </p>
        </div>
      </div>
    </div>
  );
}
