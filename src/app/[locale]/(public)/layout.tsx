import { Header } from "@/components/layouts/Header";
import Image from "next/image";
import Link from "next/link";
import dynamicImport from "next/dynamic";

export default async function PublicLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <div className="mx-auto w-full max-w-7xl lg:px-8 py-3">
      <Header />

      {/* lg */}
      <div role="tablist" className="tabs tabs-bordered tabs-lg mt-10">
        <a role="tab" className="tab !border-success !border-opacity-80">
          Phòng game
        </a>
        <a role="tab" className="tab">
          Lịch sử
        </a>
      </div>
      <Link href={"/foo"}>Go Foo</Link>
      <Link href={"/bar"}>Go Bar</Link>
      {children}
    </div>
  );
}
