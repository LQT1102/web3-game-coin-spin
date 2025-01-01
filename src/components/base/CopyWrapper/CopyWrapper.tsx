"use client";

import { copyToClipboard } from "@/utils/helper";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  stringValue: Nullable<string>;
};

const CopyWrapper = ({ className, children, stringValue }: Props) => {
  const [copyTtTitle, setCopyTtTitle] = useState("copy");
  return (
    <div className={"flex gap-1 " + className}>
      {children}
      <div className="tooltip" data-tip={copyTtTitle}>
        <span
          className="cursor-pointer"
          onClick={async () => {
            await copyToClipboard(stringValue);
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

export default CopyWrapper;
