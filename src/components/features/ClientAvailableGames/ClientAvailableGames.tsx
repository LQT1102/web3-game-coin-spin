"use client";
import React, { Ref, useEffect, useRef, useState } from "react";
import { TableAvailableGames } from "../TableAvailableGames";
import { useWeb3 } from "@/contexts/web3Context";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";
import { Modal } from "@/components/base/Modal";
import Image from "next/image";
import RadioImageControlled from "@/components/form/controllers/RadioImageController/RadioImageControlled";
import { useForm } from "react-hook-form";

type Props = {};

interface FormValues {
  myRadioField: string; // Thay đổi name cho phù hợp
}

const ClientAvailableGames = (props: Props) => {
  const { mainContractConnection, currentAccount } = useWeb3();
  const [data, setData] = useState<CoinTossGame.GameStructOutput[]>([]);
  const modalRef = useRef(null);

  const { handleSubmit, control } = useForm<FormValues>();

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

      <Modal ref={modalRef}>
        <RadioImageControlled
          name="myRadioField"
          options={[
            { value: "true", imageSrc: "/images/Coin-Heads.png", alt: "Heads" },
            { value: "false", imageSrc: "/images/Coin-Tails.png", alt: "Tails" },
          ]}
          control={control}
        />
      </Modal>

      <div className="overflow-x-auto">
        <TableAvailableGames data={data} currentAccount={currentAccount?.account?.address || ""} />
      </div>
    </>
  );
};

export default ClientAvailableGames;
