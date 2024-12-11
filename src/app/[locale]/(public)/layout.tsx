import Link from "next/link";

export default async function PublicLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return (
    <div>
      <div>Public layout</div>
      <Link href={"/foo"}>Go Foo</Link>
      <Link href={"/bar"}>Go Bar</Link>
      {children}
    </div>
  );
}
