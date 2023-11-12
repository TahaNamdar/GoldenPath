import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/Redux/store/store";
import { closeAction } from "@/app/Redux/featrues/toggle/toggleSlice";

type Props = {
  title?: String;
  children: React.ReactNode;
  name: String;
};

export default function MobileNavigation({ title, children, name }: Props) {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.toggle.active);
  const largeScreenSize = useSelector(
    (state: RootState) => state.toggle.largeScreenSizeFlag
  );
  const modalName = useSelector((state: RootState) => state.toggle.name);

  if (!active) return null;

  const outSideHandler = () => {
    if (!largeScreenSize) {
      dispatch(closeAction());
    }
  };

  if (modalName === name) {
    return (
      <div className="fixed inset-0 z-10 backdrop-blur  justify-center items-center sm:hidden">
        <OutsideClickHandler
          onOutsideClick={() => {
            outSideHandler();
          }}
        >
          <div className="fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-Crayola border-t-[0.1rem] border-t-borderColor shadow-2xl rounded-t-[1.4rem] transform-none block sm:hidden">
            <div className="pr-[3.8rem] pl-[3.8rem] m-auto">
              <div className="h-[0.5rem] bg-navLine rounded-lg w-[10.9rem] mb-[3.9rem] mr-[auto] ml-[auto]"></div>
              <p className="text-center items-center text-white m-auto text-[2.4rem] mb-[4.2rem]">
                {title}
              </p>
              {children}
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}
