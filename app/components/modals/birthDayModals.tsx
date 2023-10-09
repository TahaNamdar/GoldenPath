import React from "react";
import Close from "/public/assets/closeModal.svg";

type Props = {
  visible: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
};

export default function BirthDayModal({ visible, onClose }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-10  backdrop-blur hidden md:flex justify-center items-center">
      <div className="bg-Crayola lg:w-[57.7rem] lg:h-[37rem] text-white p-4 rounded-[1.4rem] shadow-3xl lg:pt-[3rem] lg:pr-[3.8rem] lg:pl-[3.8rem] lg:pb-[3.8rem]">
        <div className="flex items-center justify-between">
          <p className="text-white text-[2.4rem]">Change Birthday</p>
          <div className="cursor-pointer" onClick={onClose}>
            <Close />
          </div>
        </div>
      </div>
    </div>
  );
}
