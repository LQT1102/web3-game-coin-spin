import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { Web3Provider } from "@/contexts/web3Context";
import { ContractProvider } from "@/contexts/contractContext";
import ThemeWrapper from "@/components/base/ThemeWrapper/ThemeWrapper";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  console.log("RootLayout Build at " + new Date().toISOString());
  return (
    <html lang="en" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ContractProvider>
            <Web3Provider>
              <ThemeWrapper>
                {/* <div>Root layout</div> */}
                {children}
              </ThemeWrapper>
            </Web3Provider>
          </ContractProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
