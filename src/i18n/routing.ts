import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { LANG_KEYS } from "@/constants/language";

export const routing = defineRouting({
  locales: [LANG_KEYS.EN, LANG_KEYS.VI], // Define in this line the possible languages for translation
  defaultLocale: LANG_KEYS.EN, // Define in this line the default language to be shown
  localeCookie: true,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
