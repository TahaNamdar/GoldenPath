"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moreThanMobileSizeAction,
  lessThanModalSizeAction,
} from "@/app/Redux/featrues/toggle/toggleSlice";
import type { RootState } from "@/app/Redux/store/store";

export default function ActionSizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const largeScreenSize = useSelector(
    (state: RootState) => state.toggle.largeScreenSizeFlag
  );
  const active = useSelector((state: RootState) => state.toggle.active);

  const windowInnerWidth =
    typeof window !== "undefined" ? window.innerWidth : null;

  const [windowSize, setWindowSize] = useState(windowInnerWidth);
  const dispatch = useDispatch();

  const handleWindowResize = useCallback((event: any) => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (windowSize && windowSize < 540) {
        dispatch(lessThanModalSizeAction());
      }
      if (windowSize && windowSize > 540) {
        dispatch(moreThanMobileSizeAction());
      }
    }
  }, [largeScreenSize, active]);

  return <div>{children}</div>;
}
