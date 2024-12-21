"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useTheme } from "next-themes";
import React from "react";

type Props = {};

const ThemeButton = (props: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex gap-2">
      <span
        className={
          "cursor-pointer hover:text-info " +
          classNames({
            "text-info": theme && theme == "light",
          })
        }
        onClick={() => setTheme("light")}
      >
        <SunIcon width={24} />
      </span>
      <span
        className={
          "flex justify-center items-center cursor-pointer hover:text-info " +
          classNames({
            "text-info": theme && theme == "dark",
          })
        }
        onClick={() => setTheme("dark")}
      >
        <MoonIcon width={20} />
      </span>
    </div>
  );
};

export default ThemeButton;
