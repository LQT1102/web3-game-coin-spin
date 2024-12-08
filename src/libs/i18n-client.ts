import { useTranslations as useTranslationsOrigin } from "next-intl";
import lang from "@root/messages/vi.json";

export function useClientTranslations() {
  const t = useTranslationsOrigin();

  return {
    //Result as any để dùng ở đâu cũng được, kể cả trong jsx, tsx
    t: (key: NestedKeyOf<typeof lang>, param?: any) =>
      t(key as never, param) as any,
  };
}
