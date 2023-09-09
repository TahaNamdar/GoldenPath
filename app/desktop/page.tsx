"use client";

export default function Desktop() {
  return (
    <div className="h-screen bg-lightBlue md:flex p-1">
      <div className="md:w-2/12 bg-lightBlue"></div>
      <div className="md:w-10/12 bg-smoke rounded-3xl p-10">
        {/* section1 */}
        <div className="flex mb-4 md:mb-8">
          <div className=" md:w-1/2 md:flex items-center">
            <p className="text-2xl text-blueViolet font-bold mb-2">
              Yearly Goals
            </p>
            <button className=" md:ml-4 text-sm border-solid border-2 border-lavender text-lavender p-2 rounded-xl w-32 sm:w-40 ">
              2023 goals
            </button>
            <button className="ml-2 md:ml-4 text-sm border-solid border-2 border-lavender text-lavender p-2 rounded-xl md:w-24">
              tutorial
            </button>
          </div>
          <div className="md:w-1/2"></div>
        </div>
        {/* section2 */}

        <div className="md:flex">
          <div className="w-full mb-4 md:w-2/3 bg-white rounded-2xl md:mr-6 h-64"></div>
          <div className="w-full md:w-1/3 bg-white rounded-2xl h-64"></div>
        </div>
      </div>
    </div>
  );
}
