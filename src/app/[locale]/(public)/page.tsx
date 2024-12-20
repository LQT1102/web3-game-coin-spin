import Test from "@/components/Test";
import useServerTranslations from "@/libs/i18n-server";
import Image from "next/image";
import dynamicImport from "next/dynamic";

const DynamicComponent = dynamicImport(
  () => import("@/components/Foo").then((x) => x.default) as any,
  {
    loading: () => <p>Loading...</p>,
    //Ssr false chỉ dùng được khi ở client component, chỉ định có kết xuất html trước ở server component hay xuống client mới kết xuất
  }
);

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { t } = await useServerTranslations(locale);
  console.log("==========Render page: " + Date.now());
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button className="btn btn-primary">Button</button>
        <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" className="btn btn-primary">
          Toggle theme
        </button>

        {t("hello")}
        <DynamicComponent />
        <Test />
      </main>
    </div>
  );
}

const revalidate = 1000,
  dynamic = "force-static";
export { revalidate, dynamic };
