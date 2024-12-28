"use client";
import React, { Ref, useEffect, useRef, useState } from "react";
import { TableAvailableGames } from "../TableAvailableGames";
import { useWeb3 } from "@/contexts/web3Context";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";
import { Modal } from "@/components/base/Modal";
import Image from "next/image";
import RadioImageControlled from "@/components/form/controllers/RadioImageController/RadioImageControlled";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import { useAppLoading } from "@/contexts/loadingContext";
import { etherToWei } from "@/utils/converter";

type Props = {};

interface FormValues {
  isHeads: boolean;
  betAmount: number;
}

const ClientAvailableGames = (props: Props) => {
  const { mainContractConnection, currentAccount } = useWeb3();
  const [data, setData] = useState<CoinTossGame.GameStructOutput[]>([]);
  const modalRef = useRef(null);

  const { showLoading, hideLoading, state } = useAppLoading();
  console.log(state.isLoading);

  const { handleSubmit, control, register, getValues, watch } = useForm<FormValues>({
    defaultValues: {
      betAmount: 0,
      isHeads: true,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      showLoading();
      const weiValue = etherToWei(data.betAmount);
      await (await mainContractConnection?.createGame.send(data.isHeads, { value: weiValue }))?.wait();
      refreshData();

      //@ts-ignore
      modalRef.current?.close();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        hideLoading();
      }, 1000);
    }
  };

  const value = watch();

  const refreshData = async () => {
    if (mainContractConnection) {
      const availableGameIDs = await mainContractConnection?.getWaitingGames();
      const promises: Promise<CoinTossGame.GameStructOutput>[] = [];
      for (const availableGameID of availableGameIDs) {
        const promise = mainContractConnection.getGameById(availableGameID);
        promises.push(promise);
      }

      const games = await Promise.all(promises);
      setData(games);
    }
  };
  useEffect(() => {
    refreshData();
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

      <Modal ref={modalRef} title="Tạo mới trò chơi">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FieldWrapper label="Số lượng ETH">
              <input
                {...register("betAmount", { valueAsNumber: true })}
                type="number"
                step={0.0000001}
                placeholder="Nhập số lượng ETH"
                className="input input-bordered w-full max-w-xs placeholder:text-sm placeholder:text-opacity-0"
              />
            </FieldWrapper>

            <FieldWrapper label="Bạn chọn">
              <RadioImageControlled
                name="isHeads"
                isBooleanValue
                options={[
                  { value: true, imageSrc: "/images/Coin-Heads.png", alt: "Heads", label: "Heads" },
                  { value: false, imageSrc: "/images/Coin-Tails.png", alt: "Tails", label: "Tails" },
                ]}
                control={control}
              />
            </FieldWrapper>
          </div>

          <div className="mt-5 flex justify-center">
            <button className="btn btn-info" type="submit">
              Tạo mới
            </button>
          </div>
        </form>
      </Modal>

      <div className="overflow-x-auto">
        <TableAvailableGames data={data} currentAccount={currentAccount?.account?.address || ""} />
      </div>
    </>
  );
};

export default ClientAvailableGames;
