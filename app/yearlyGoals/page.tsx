"use client";

export default function YearlyGoals() {
  return (
    <div className="h-screen bg-lightBlue md:flex p-1">
      <div className="md:w-2/12 bg-lightBlue"></div>
      <div className="md:w-10/12 bg-smoke rounded-2xl p-10">
        {/* section1 */}
        <div className="flex mb-4 md:mb-8">
          <div className=" md:w-1/2 md:flex items-center">
            <p className="text-2xl text-blueViolet font-bold mb-2">
              Yearly Goals
            </p>
          </div>
          <div className="md:w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
