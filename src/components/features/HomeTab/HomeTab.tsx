"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const HomeTab = (props: Props) => {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <div role="tablist" className="tabs tabs-bordered tabs-lg mt-10">
      <Link
        role="tab"
        prefetch={null}
        href="/"
        className={
          "tab " +
          classNames({
            "!border-info !border-opacity-80 text-info font-bold": isActivePath("/"),
          })
        }
      >
        <h2>Tham gia ngay</h2>
      </Link>
      <Link
        role="tab"
        href="/history"
        prefetch={null}
        className={
          "tab " +
          classNames({
            "!border-info !border-opacity-80 text-info font-bold": isActivePath("/history"),
          })
        }
      >
        <h2 className="">Lịch sử</h2>
      </Link>
    </div>
  );
};

export default HomeTab;
