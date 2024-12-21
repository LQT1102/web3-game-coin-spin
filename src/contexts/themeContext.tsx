"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { themeChange } from "theme-change";

//Context lưu các thông tin về main contact đang được chọn dùng trong app
interface ThemeContextProps {
  currentTheme: Nullable<string>;
}

const ThemeContext = createContext<Partial<ThemeContextProps>>({
  currentTheme: null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeInfo, setThemeInfo] = useState<Partial<ThemeContextProps>>();

  const init = () => {
    const htmlElement = document?.documentElement;
    if (!htmlElement) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          const currentTheme = htmlElement.getAttribute("data-theme");
          setThemeInfo({ currentTheme: currentTheme });
          console.log("Current theme: ", currentTheme);
        }
      });
    });

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  };

  useEffect(() => {
    init();
    themeChange(false);

    // Clean up các listener khi component bị unmount
    return () => {};
  }, []);

  return <ThemeContext.Provider value={{ ...themeInfo }}>{children}</ThemeContext.Provider>;
};
