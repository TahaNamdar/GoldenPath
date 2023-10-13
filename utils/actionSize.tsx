"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  moreThanMobileSizeAction,
  lessThanModalSizeAction,
} from "@/app/Redux/featrues/toggle/toggleSlice";

export default function ActionSizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  if (typeof window !== "undefined") {
    if (windowSize && windowSize < 540) {
      dispatch(lessThanModalSizeAction());
    }
    if (windowSize && windowSize > 540) {
      dispatch(moreThanMobileSizeAction());
    }
  }

  return <div>{children}</div>;
}
