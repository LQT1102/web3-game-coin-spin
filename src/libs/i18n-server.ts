import lang from "@root/messages/vi.json";
import { getTranslations } from "next-intl/server";

export default async function useServerTranslations(locale: string) {
  const t = await getTranslations({ locale });

  return {
    //Result as any để dùng ở đâu cũng được, kể cả trong jsx, tsx
    t: (key: NestedKeyOf<typeof lang>, param?: any) => t(key, param) as any,
  };
}
