"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./Redux/store/store";
import { openAction, closeAction } from "./Redux/featrues/toggle/toggleSlice";

// test redux

export default function Home() {
  const active = useSelector((state: RootState) => state.toggle.active);
  const dispatch = useDispatch();

  console.log(active, "status");

  return (
    <div className="bg-darkGunmetal h-screen p-10">
      <p className="text-white mb-6 text-3xl">Golden path</p>

      <button
        className="bg-green-600 p-8 text-white mr-5"
        onClick={() => dispatch(openAction())}
      >
        open
      </button>
      <button
        className="bg-red-600 text-white p-8"
        onClick={() => dispatch(closeAction())}
      >
        close
      </button>
    </div>
  );
}
