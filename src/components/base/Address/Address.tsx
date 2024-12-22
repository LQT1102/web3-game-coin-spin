"use client";

import { formatAddressView } from "@/utils/converter";
import { copyToClipboard } from "@/utils/helper";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import React, { HTMLAttributes, useState } from "react";

type Props = {
  address: string;
  className?: string;
};

const Address = ({ address, className }: Props) => {
  const [copyTtTitle, setCopyTtTitle] = useState("copy");
  return (
    <div className={"flex gap-1 " + className}>
      <span>{formatAddressView(address)}</span>
      <div className="tooltip" data-tip={copyTtTitle}>
        <span
          className="cursor-pointer"
          onClick={async () => {
            await copyToClipboard(address);
            setCopyTtTitle("copied");
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setCopyTtTitle("copy");
            }, 500);
          }}
        >
          <DocumentDuplicateIcon width={18} />
        </span>
      </div>
    </div>
  );
};

export default Address;
