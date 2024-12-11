export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  return <div>Bar page</div>;
}
