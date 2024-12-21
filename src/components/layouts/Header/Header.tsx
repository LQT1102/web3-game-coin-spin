"use client";

import { useWeb3 } from "@/contexts/web3Context";
import { bigintToResultView, formatAddressView } from "@/utils/converter";
import { BanknotesIcon, WalletIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image";

/**
 * Render button theme chỉ ở client để không bị lỗi hydration do ở server không lấy được theme
 */
const ThemeButtonOnlyClient = dynamic(() => import("../../features/ThemeButton/ThemeButton"), {
  ssr: false,
  loading: () => <div className="flex-1 min-w-0">...</div>,
});

type Props = {};

const Header = (props: Props) => {
  const { currentAccount } = useWeb3();

  return (
    <div className="flex items-center w-full gap-4">
      {/* <div className="line h-1 bg-gradient-to-r from-transparent to-success flex-grow mr-5"></div> */}

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex gap-2">
          <WalletIcon width={24} className="text-info" />
          <span>{formatAddressView(currentAccount?.account?.address || "")} </span>
        </div>

        <div className="flex gap-3">
          <BanknotesIcon width={24} className="text-info" />
          <span>{bigintToResultView(currentAccount?.balance)} ETH</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Image
          src="/images/coin.png"
          alt="Soccer Ball"
          width={150}
          height={150}
          className="icon animate-[spin_3s_linear_infinite] w-[100px] h-[100px]"
        />

        <h1>EZ Coin Toss</h1>
      </div>

      <div className="flex-1 min-w-0 flex justify-end mb-auto">
        <ThemeButtonOnlyClient />
      </div>
    </div>
  );
};

export default Header;
