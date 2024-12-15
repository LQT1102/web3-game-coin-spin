"use client";

import React, { ReactNode, useEffect } from "react";
import { themeChange } from "theme-change";

function ThemeWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    themeChange(false);
  }, []);

  return <>{children}</>;
}

export default ThemeWrapper;
