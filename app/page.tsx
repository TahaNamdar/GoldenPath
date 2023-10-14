"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./Redux/store/store";
import {
  openAction,
  closeAction,
  setModalNameAction,
} from "./Redux/featrues/toggle/toggleSlice";
import GoldenModal from "./components/goldenModal/goldenModal";

// test redux

export default function Home() {
  const active = useSelector((state: RootState) => state.toggle.active);
  const dispatch = useDispatch();

  console.log(active, "status");

  const handler = () => {
    dispatch(openAction());
    dispatch(setModalNameAction("changeBirthday"));
  };

  return (
    <div className="bg-darkGunmetal h-screen p-10">
      <p className="text-white mb-6 text-3xl">Golden path</p>

      <GoldenModal title="Change BirthDay" name="changeBirthday">
        testttttt
      </GoldenModal>

      <button
        onClick={() => handler()}
        className="cursor-pointer text-white text-3xl"
      >
        click me
      </button>
    </div>
  );
}
