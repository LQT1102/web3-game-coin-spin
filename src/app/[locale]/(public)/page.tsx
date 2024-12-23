import Test from "@/components/Test";
import { ClientAvailableGames } from "@/components/features/ClientAvailableGames";
import { TableAvailableGames } from "@/components/features/TableAvailableGames";
import useServerTranslations from "@/libs/i18n-server";
import { formatAddressView } from "@/utils/converter";
import dynamicImport from "next/dynamic";

const DynamicComponent = dynamicImport(() => import("@/components/Foo") as any, {
  loading: () => <div>...</div>,
  //Ssr false chỉ dùng được khi ở client component, chỉ định có kết xuất html trước ở server component hay xuống client mới kết xuất
});

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { t } = await useServerTranslations(locale);
  console.log("==========Render page: " + Date.now());

  return (
    <main>
      <ClientAvailableGames />
    </main>
  );
}

const revalidate = 1000,
  dynamic = "force-static";
export { revalidate, dynamic };
