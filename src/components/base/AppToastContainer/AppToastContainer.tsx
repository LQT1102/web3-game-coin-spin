"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

type Props = {};

const AppToastContainer = (props: Props) => {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      transition={Bounce}
    />
  );
};

export default AppToastContainer;
