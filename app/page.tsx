"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import { trpc } from "@/utils/trpc";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
}));

export default function Home() {
  const mutation = trpc.signUp.useMutation();

  return <Div>Home Page Loaded From Mui</Div>;
}
