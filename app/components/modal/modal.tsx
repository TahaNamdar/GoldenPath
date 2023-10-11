import React, { ReactNode } from "react";
import Close from "/public/assets/closeModal.svg";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/Redux/store/store";
import { closeAction } from "@/app/Redux/featrues/toggle/toggleSlice";

type Props = {
  title?: String;
  children: ReactNode;
};

export default function Modal({ title, children }: Props) {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.toggle.active);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-10  backdrop-blur hidden sm:flex justify-center items-center">
      <div className="bg-Crayola lg:w-[57.7rem]  text-white p-4 rounded-[1.4rem] shadow-3xl lg:pt-[3rem] lg:pr-[3.8rem] lg:pl-[3.8rem] lg:pb-[3.8rem]">
        <div className="flex items-center justify-between mb-[4.6rem]">
          <p className="text-white text-[2.4rem]">{title}</p>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(closeAction())}
          >
            <Close />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
