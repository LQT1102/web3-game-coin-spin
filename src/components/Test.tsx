"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

export type Translations = { MyComponent: { welcomeMessage: string } };

function Test() {
  const t = useTranslations();

  useEffect(() => {
    console.log(t("hello"));
  }, []);

  return <div>Test i18n from client render {t("hello")}</div>;
}

export default Test;
