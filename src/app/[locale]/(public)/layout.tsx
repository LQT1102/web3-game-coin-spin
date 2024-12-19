import Image from "next/image";
import Link from "next/link";

export default async function PublicLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <div className="mx-auto w-full max-w-7xl lg:px-8 py-8">
      <div className="container flex items-center w-full">
        <div className="line h-1 bg-gradient-to-r from-transparent to-green-500 flex-grow mr-5"></div>
        <div className="center-content flex items-center">
          <Image src="/vercel.svg" alt="Soccer Ball" width={50} height={50} className="icon w-10 h-auto" />
        </div>
        <div className="line h-1 bg-gradient-to-r from-green-500 to-transparent flex-grow ml-5"></div>
      </div>

      {/* lg */}
      <div role="tablist" className="tabs tabs-bordered tabs-lg mt-10">
        <a role="tab" className="tab">
          Phòng game
        </a>
        <a role="tab" className="tab tab-active">
          Lịch sử
        </a>
      </div>
      <Link href={"/foo"}>Go Foo</Link>
      <Link href={"/bar"}>Go Bar</Link>
      {children}
    </div>
  );
}
