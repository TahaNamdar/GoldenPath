import React, { useState, useEffect } from "react";
import Close from "/public/assets/closeModal.svg";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/Redux/store/store";
import { closeAction } from "@/app/Redux/featrues/toggle/toggleSlice";
import OutsideClickHandler from "react-outside-click-handler";

type Props = {
  title?: String;
  children: any;
  name: String;
};

export default function GoldenModal({ title, children, name }: Props) {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.toggle.active);
  const modalName = useSelector((state: RootState) => state.toggle.name);

  const [isXlScreen, setIsXlScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 540) {
      setIsXlScreen(true);
    } else {
      setIsXlScreen(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 540) {
        setIsXlScreen(true);
      } else {
        setIsXlScreen(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const outSideHandler = () => {
    if (!isXlScreen) {
      dispatch(closeAction());
    }
  };

  if (!active) return null;

  if (modalName === name) {
    return (
      <div className="fixed inset-0 z-10  backdrop-blur  flex justify-center items-center">
        <OutsideClickHandler
          onOutsideClick={() => {
            outSideHandler();
          }}
        >
          <div
            className={`bg-Crayola  fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform border-t-[0.1rem] border-t-borderColor shadow-2xl rounded-t-[1.4rem] transform-none sm:relative  sm:w-[57.7rem]  text-white sm:p-4 sm:rounded-[1.4rem] sm:shadow-3xl pt-[3rem] pr-[3.8rem] pl-[3.8rem] pb-[3.8rem] sm:pt-[3rem] sm:pr-[3.8rem] sm:pl-[3.8rem] sm:pb-[3.8rem] `}
          >
            <div className="pr-[3.8rem] pl-[3.8rem] m-auto sm:pr-0 sm:pl-0  sm:flex sm:items-center sm:justify-between sm:mb-[4.6rem] ">
              <div className="h-[0.5rem] bg-navLine rounded-lg w-[10.9rem] mb-[3.9rem] mr-[auto] ml-[auto] block sm:hidden"></div>
              <p className="text-white  text-center items-center m-auto text-[2.4rem] mb-[4.2rem]  sm:m-0 sm:mb-0">
                {title}
              </p>
              <div
                className="cursor-pointer hidden sm:block"
                onClick={() => dispatch(closeAction())}
              >
                <Close />
              </div>
            </div>
            {children}
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}
