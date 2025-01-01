import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | string;
  href: string;
};

const LinkNewTab = ({ children, href }: Props) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex items-center gap-1 cursor-pointer">
        <div className="text-sm text-neutral-content hover:text-info hover:underline">{children}</div>{" "}
        <ArrowTopRightOnSquareIcon className="text-info w-4" />
      </div>
    </Link>
  );
};

export default LinkNewTab;
