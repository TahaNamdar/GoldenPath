import React, { ReactNode } from "react";
import Close from "/public/assets/closeModal.svg";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/Redux/store/store";
import { closeAction } from "@/app/Redux/featrues/toggle/toggleSlice";

type Props = {
  title?: String;
  children: ReactNode;
  name: String;
};

export default function Modal({ title, children, name }: Props) {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.toggle.active);
  const modalName = useSelector((state: RootState) => state.toggle.name);

  if (!active) return null;

  if (modalName === name) {
    return (
      <div className="fixed inset-0 z-10  backdrop-blur hidden sm:flex justify-center items-center">
        <div className="bg-Crayola sm:w-[57.7rem]  text-white p-4 rounded-[1.4rem] shadow-3xl sm:pt-[3rem] sm:pr-[3.8rem] sm:pl-[3.8rem] sm:pb-[3.8rem]">
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
}
