"use client";

import React, { useEffect } from "react";
import lang from "../../messages/en.json";
import { useClientTranslations } from "@/libs/i18n-client";

function Test() {
  const { t } = useClientTranslations();

  useEffect(() => {
    console.log(t("hello"));
  }, []);

  return <div>Test i18n from client render {t("hello")}</div>;
}

export default Test;
