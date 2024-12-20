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
      <div className="container flex items-center w-full gap-4">
        {/* <div className="line h-1 bg-gradient-to-r from-transparent to-success flex-grow mr-5"></div> */}

        <div className="flex-1 min-w-0">Thông tin account</div>

        <div className="flex justify-center items-center">
          <Image
            src="/images/coin.png"
            alt="Soccer Ball"
            width={150}
            height={150}
            className="icon animate-[spin_3s_linear_infinite] w-[100px] h-[100px]"
          />
        </div>
        <div className="flex-1 min-w-0">Chọn theme</div>
      </div>

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
