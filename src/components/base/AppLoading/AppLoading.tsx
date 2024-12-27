"use client";

import { useAppLoading } from "@/contexts/loadingContext";
import React from "react";

type Props = {};

const AppLoading = (props: Props) => {
  const { state } = useAppLoading();
  if (!state.isLoading) return <></>;
  return (
    <div className="min-h-screen w-full bg-base-100 bg-opacity-70 cursor-wait absolute top-0 left-0 z-[99999] flex justify-center items-center">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default AppLoading;
