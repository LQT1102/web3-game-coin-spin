"use client";

import { CopyWrapper } from "@/components/base/CopyWrapper";
import { LinkNewTab } from "@/components/base/LinkNewTab";
import { useWeb3 } from "@/contexts/web3Context";
import { useClientTranslations } from "@/libs/i18n-client";
import { weiToETH, formatAddressView } from "@/utils/converter";
import {
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image";
import { format } from "react-string-format";

/**
 * Render button theme chỉ ở client để không bị lỗi hydration do ở server không lấy được theme
 */
const ThemeButtonOnlyClient = dynamic(() => import("../../features/ThemeButton").then((x) => x.ThemeButton), {
  ssr: false,
  loading: () => <div className="flex-1 min-w-0">...</div>,
});

const LanguageButtonOnlyClient = dynamic(() => import("../../features/LanguageButton").then((x) => x.LanguageButton), {
  ssr: false,
  loading: () => <div className="flex-1 min-w-0">...</div>,
});

type Props = {};

const Header = (props: Props) => {
  const { currentAccount, status } = useWeb3();
  const { t } = useClientTranslations();

  console.log(status);

  if (status == "ERROR") {
    return (
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <ExclamationTriangleIcon width={80} className="text-red-500" />
        <div className="text-3xl text-red-500">{t("GeneralErrorNetwork")}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full gap-4">
      {/* <div className="line h-1 bg-gradient-to-r from-transparent to-success flex-grow mr-5"></div> */}

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex gap-2">
          <WalletIcon width={24} className="text-info" />
          <CopyWrapper stringValue={currentAccount?.account?.address}>
            {formatAddressView(currentAccount?.account?.address || "")}
          </CopyWrapper>
        </div>

        <div className="flex gap-3">
          <BanknotesIcon width={24} className="text-info" />
          <span>{weiToETH(currentAccount?.balance)} ETH</span>
        </div>

        <LinkNewTab
          href={format(process.env.NEXT_PUBLIC_ADDRESS_DETAIL_URL || "", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)}
        >
          <div className="flex gap-3">
            <ClipboardDocumentCheckIcon width={24} className="text-info" />
            <span className="text-[16px] leading-[24px] text-base-content">
              Contract: {formatAddressView(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "")}
            </span>
          </div>
        </LinkNewTab>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Image
          src="/images/coin.png"
          alt="Soccer Ball"
          width={150}
          height={150}
          className="icon animate-[spin_3s_linear_infinite] w-[100px] h-[100px]"
        />

        <h1 className="font-bold text-xl mt-5 border-y-[2px] border-info text-info">EZ Coin Spin</h1>
      </div>

      <div className="flex-1 min-w-0 gap-2 flex justify-end mb-auto items-center">
        <ThemeButtonOnlyClient />
        <LanguageButtonOnlyClient />
      </div>
    </div>
  );
};

export default Header;
