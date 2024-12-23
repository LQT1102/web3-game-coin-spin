"use client";
import React, { Ref, useEffect, useRef, useState } from "react";
import { TableAvailableGames } from "../TableAvailableGames";
import { useWeb3 } from "@/contexts/web3Context";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";
import { Modal } from "@/components/base/Modal";

type Props = {};

const ClientAvailableGames = (props: Props) => {
  const { mainContractConnection, currentAccount } = useWeb3();
  const [data, setData] = useState<CoinTossGame.GameStructOutput[]>([]);
  const modalRef = useRef(null);

  useEffect(() => {
    if (mainContractConnection) {
      (async () => {
        const availableGameIDs = await mainContractConnection?.getWaitingGames();
        const promises: Promise<CoinTossGame.GameStructOutput>[] = [];
        for (const availableGameID of availableGameIDs) {
          const promise = mainContractConnection.getGameById(availableGameID);
          promises.push(promise);
        }

        const games = await Promise.all(promises);
        setData(games);
      })();
    }
  }, [mainContractConnection]);

  return (
    <>
      <div className="my-6">
        <button
          className="btn btn-info btn-sm"
          onClick={() => {
            //@ts-ignore
            modalRef.current?.showModal();
          }}
        >
          Create new game
        </button>
      </div>

      <Modal ref={modalRef} />

      <div className="overflow-x-auto">
        <TableAvailableGames data={data} currentAccount={currentAccount?.account?.address || ""} />
      </div>
    </>
  );
};

export default ClientAvailableGames;
