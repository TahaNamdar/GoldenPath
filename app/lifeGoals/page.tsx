import SideBar from "../components/sideBar/sideBar";

export default function LifeGoals() {
  return (
    <div className="h-screen flex bg-electricIndigo">
      <SideBar sideBarName="Tahaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
      <div className="md:flex-1 p-10 bg-smoke rounded-md pl-[3.7rem] pr-[4.6rem]">
        <div className="md:flex items-center justify-between mb-[3.7rem] mt-[4.5rem]">
          <p className="text-3xl  md:text-4xl text-blueViolet font-medium mb-4 md:mb-2">
            Life Goals{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
