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
import { bigintToResultView, etherToWei } from "@/utils/converter";
import { Bounce, toast } from "react-toastify";
import { LinkNewTab } from "@/components/base/LinkNewTab";
import { format } from "react-string-format";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { object, number, string, ObjectSchema } from "yup";
import { CoinSpinning } from "@/components/base/CoinSpinning";
import classNames from "classnames";

type Props = {};

interface FormValues {
  isHeads: boolean;
  betAmount: number;
}

const ClientAvailableGames = (props: Props) => {
  const { mainContractConnection, currentAccount, refreshCurrentAccount } = useWeb3();
  const [data, setData] = useState<CoinTossGame.GameStructOutput[]>([]);
  const modalCreateGameRef = useRef(null);
  const modalJoinGameRef = useRef(null);
  const modalCoinSpinningRef = useRef(null);
  const [fee, setFee] = useState(0);
  const [gameSelected, setGameSelected] = useState<CoinTossGame.GameStructOutput | undefined>();
  const [result, setResult] = useState<{ side: Nullable<"Heads" | "Tails">; winner: string }>({
    side: null,
    winner: "",
  });

  const { showLoading, hideLoading, state } = useAppLoading();

  const formSchema: yup.ObjectSchema<FormValues> = yup
    .object({
      isHeads: yup.boolean().required(),
      betAmount: yup.number().required().min(0.0001, "Giá trị cược phải lớn hơn 0.0001"),
    })
    .required();

  const { handleSubmit, control, register, reset, watch, formState } = useForm<FormValues>({
    defaultValues: {
      betAmount: 0,
      isHeads: true,
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      showLoading();
      const weiValue = etherToWei(data.betAmount);
      const result = await (await mainContractConnection?.createGame.send(data.isHeads, { value: weiValue }))?.wait();

      const hash = result?.hash;

      let gameId: any;
      if (result && result?.logs && result.logs.length > 0) {
        for (const log of result.logs) {
          try {
            const event = mainContractConnection?.interface.parseLog(log);
            if (event && event.name === "GameCreated") {
              gameId = event.args.gameId;
              console.log("New game created with ID:", gameId);
            }
          } catch (error) {
            console.log("Error when parse event log", error);
          }
        }
      }

      refreshData();
      toast.success(
        <div>
          <div className="mb-2">{`Tạo mới trò chơi thành công !`}</div>
          <LinkNewTab href={format(process.env.NEXT_PUBLIC_TX_DETAIL_URL || "", hash)}>
            {`Game ID ${gameId}, Xem chi tiết`}
          </LinkNewTab>
        </div>
      );
      refreshCurrentAccount();
      //@ts-ignore
      modalCreateGameRef.current?.close();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      hideLoading();
    }
  };

  const handleCancel = async (gameId: bigint) => {
    try {
      showLoading();
      const result = await (await mainContractConnection?.cancelGame(gameId))?.wait();
      refreshData();
      toast.success(
        <div>
          <div className="mb-2">{`Huỷ game thành công !`}</div>
          <LinkNewTab href={format(process.env.NEXT_PUBLIC_TX_DETAIL_URL || "", result?.hash)}>
            {`Game ID: ${gameId}` + ", xem chi tiết"}
          </LinkNewTab>
        </div>
      );
      refreshCurrentAccount();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
      hideLoading();
    } finally {
      hideLoading();
    }
  };

  const handleJoin = async (gameId: bigint) => {
    try {
      showLoading();
      const game = await mainContractConnection?.getGameById(gameId);
      setGameSelected(game);
      //@ts-ignore
      modalJoinGameRef.current?.showModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      hideLoading();
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

  const handleConfirmJoin = async () => {
    try {
      if (!gameSelected) return;
      showLoading();

      //Show hiệu ứng xoay

      const transaction = await mainContractConnection?.joinGame.send(gameSelected?.gameId, {
        value: gameSelected.betAmount,
      });

      hideLoading();
      //@ts-ignore
      modalJoinGameRef.current?.close();

      //@ts-ignore
      modalCoinSpinningRef?.current?.showModal();

      const result = await transaction?.wait();

      let winnerAddress = "";

      if (result && result?.logs && result.logs.length > 0) {
        for (const log of result.logs) {
          try {
            const event = mainContractConnection?.interface.parseLog(log);
            if (event && event.name === "GameFinished") {
              const { gameId, winner, winningAmount } = event.args;
              winnerAddress = winner;
            }
          } catch (error) {
            console.log("Error when parse event log", error);
          }
        }
      }

      debugger;
      //Nếu người join win thì kết quả chính là ngược so với host address
      if (winnerAddress === currentAccount?.account?.address) {
        setResult({
          side: gameSelected.player1Choice ? "Tails" : "Heads",
          winner: winnerAddress,
        });
      } else {
        setResult({ side: gameSelected.player1Choice ? "Heads" : "Tails", winner: winnerAddress });
      }

      refreshData();
    } catch (error) {
      console.log(error);

      hideLoading();
      //@ts-ignore
      modalCoinSpinningRef?.current?.close();
    } finally {
    }
  };

  const handleCloseCoinSpinning = () => {
    //@ts-ignore
    modalCoinSpinningRef?.current?.close();
    setGameSelected(undefined);
    setResult({ side: null, winner: "" });
  };

  useEffect(() => {
    refreshData();
  }, [mainContractConnection]);

  useEffect(() => {
    if (mainContractConnection) {
      (async () => {
        const fee = await mainContractConnection.feePercent();
        setFee(+fee.toString());
      })();
    }
  }, [mainContractConnection]);

  // useEffect(() => {
  //   // @ts-ignore
  //   modalCoinSpinningRef?.current?.showModal();
  //   setTimeout(() => {
  //     setResult("Tails");
  //   }, 3000);
  // }, []);

  return (
    <>
      <div className="my-6">
        <button
          className="btn btn-info btn-sm"
          onClick={() => {
            //@ts-ignore
            modalCreateGameRef.current?.showModal();
          }}
        >
          Create new game
        </button>
      </div>

      <Modal
        ref={modalCreateGameRef}
        title="Tạo mới trò chơi"
        onClose={() => {
          reset();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FieldWrapper label="Số lượng ETH" error={formState.errors.betAmount?.message}>
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

            <FieldWrapper label="Người thắng được">
              <div>{100 - fee}% tiền cược</div>
            </FieldWrapper>
          </div>

          <div className="mt-5 flex justify-center">
            <button className="btn btn-info" type="submit">
              Tạo mới
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        ref={modalCoinSpinningRef}
        closeOnClickOutside={false}
        showBtnClose={false}
        title={`Game ID: ${gameSelected?.gameId}`}
      >
        <div className="flex justify-center">
          <CoinSpinning result={result.side as any} />
        </div>

        <div className="flex flex-col gap-4">
          <FieldWrapper label={"Bạn đã chọn"}>
            <div className="flex gap-2 items-center">
              <Image
                src={gameSelected?.player1Choice ? "/images/Coin-Tails.png" : "/images/Coin-Heads.png"}
                alt={""}
                width={64}
                height={64}
                className={`w-16 h-16 rounded-full border-2 border-info`}
              />

              <div>{gameSelected?.player1Choice ? "Mặt Úp" : "Mặt ngửa"}</div>
            </div>
          </FieldWrapper>

          <FieldWrapper label={"Số lượng ETH"}>{bigintToResultView(gameSelected?.betAmount)} ETH</FieldWrapper>

          <FieldWrapper label="Người thắng được">
            <div>{100 - fee}% tiền cược</div>
          </FieldWrapper>

          {!!result.winner && (
            <FieldWrapper label="Kết quả">
              <div
                className={classNames({
                  "text-success": result.winner === currentAccount?.account?.address,
                  "text-error": result.winner !== currentAccount?.account?.address,
                })}
              >
                {result.winner === currentAccount?.account?.address ? "Thắng" : "Thua"}
              </div>
            </FieldWrapper>
          )}
        </div>

        {!!result.winner && (
          <div className="mt-5 flex justify-center">
            <button className="btn btn-info" onClick={handleCloseCoinSpinning}>
              Xác nhận
            </button>
          </div>
        )}
      </Modal>

      <Modal ref={modalJoinGameRef} title="Tham gia trò chơi">
        <div className="flex flex-col gap-4">
          <FieldWrapper label={"Host Address"}>{gameSelected?.player1}</FieldWrapper>

          <FieldWrapper label={"Bạn sẽ chọn"}>
            <div className="flex gap-2 items-center">
              <Image
                src={gameSelected?.player1Choice ? "/images/Coin-Tails.png" : "/images/Coin-Heads.png"}
                alt={""}
                width={64}
                height={64}
                className={`w-16 h-16 rounded-full border-2 border-info`}
              />

              <div>{gameSelected?.player1Choice ? "Mặt Úp" : "Mặt ngửa"}</div>
            </div>
          </FieldWrapper>

          <FieldWrapper label={"Số lượng ETH"}>{bigintToResultView(gameSelected?.betAmount)} ETH</FieldWrapper>

          <FieldWrapper label="Người thắng được">
            <div>{100 - fee}% tiền cược</div>
          </FieldWrapper>
        </div>

        <div className="mt-5 flex justify-center">
          <button className="btn btn-info" type="submit" onClick={handleConfirmJoin}>
            Tham gia
          </button>
        </div>
      </Modal>

      <div className="overflow-x-auto">
        <TableAvailableGames
          data={data}
          currentAccount={currentAccount?.account?.address || ""}
          onClickCancel={handleCancel}
          onClickJoin={handleJoin}
        />
      </div>
    </>
  );
};

export default ClientAvailableGames;
