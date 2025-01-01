"use client";
import { LANG_KEYS } from "@/constants/language";
import { getCookie, setCookie } from "@/utils/cookie";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

type Props = {};

const LanguageButton = (props: Props) => {
  const LANGS = [
    {
      img: "/svg/vn.svg",
      value: LANG_KEYS.VI,
    },
    {
      img: "/svg/en.svg",
      value: LANG_KEYS.EN,
    },
  ];
  const [showList, setShowList] = useState(false);
  const [lang, setLang] = useState();
  useEffect(() => {
    const langCookie = getCookie("NEXT_LOCALE");
    setLang(langCookie);
  }, []);

  const handleSelectLang = (target: string) => {
    setCookie("NEXT_LOCALE", target, 365);
    location.reload();
  };

  const selectedLang = LANGS.find((x) => x.value === lang);
  return (
    <div className="relative inline-block w-6 h-[18px]">
      <button
        onClick={() => setShowList(!showList)}
        id="flag-select-button"
        className="b-0 m-0 shadow-sm bg-background"
      >
        <img id="selected-flag" src={selectedLang?.img} alt="Selected Flag" className="w-6 h-[18px]" />
      </button>
      <ul
        id="flag-select-options"
        className={
          `absolute z-10 border shadow-lg bg-background ` +
          classNames({
            hidden: !showList,
          })
        }
      >
        {LANGS.filter((x) => x.value !== lang).map((x) => {
          return (
            <li onClick={() => handleSelectLang(x.value)} key={x.value} className="cursor-pointer" data-value={x.value}>
              <img src={x.img} alt={x.value} className="w-6" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageButton;
