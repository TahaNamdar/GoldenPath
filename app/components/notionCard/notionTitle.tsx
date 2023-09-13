import RateVector from "../../../public/assets/Rating_.svg";

export default function NotionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center text-[1.6rem] font-normal text-lightBlack mb-[1.4rem] pl-[4.6rem] pr-[1.3rem]">
      <input
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="w-[2.4rem] h-[2.4rem] text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <div className="mr-[1.1rem] ml-[1.1rem]">{children}</div>
      <div className="cursor-pointer">
        <RateVector />
      </div>
    </li>
  );
}
