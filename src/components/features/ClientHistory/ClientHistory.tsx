"use client";
import { useWeb3 } from "@/contexts/web3Context";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";
import React, { useEffect, useState } from "react";
import { TableHistory } from "../TableHistory";
import { LinkNewTab } from "@/components/base/LinkNewTab";
import { toast } from "react-toastify";
import { format } from "react-string-format";
import { useAppLoading } from "@/contexts/loadingContext";

type Props = {};

const ClientHistory = (props: Props) => {
  const { mainContractConnection, currentAccount, refreshCurrentAccount } = useWeb3();
  const [data, setData] = useState<CoinTossGame.GameStructOutput[]>([]);
  const { showLoading, hideLoading, state } = useAppLoading();

  const refreshData = async () => {
    if (!mainContractConnection || !currentAccount?.account?.address) return;
    const gameJoinedEventsFilter = mainContractConnection.filters.GameJoined(
      undefined,
      currentAccount?.account?.address
    );

    const gameJoinedEvents = await mainContractConnection.queryFilter(gameJoinedEventsFilter);

    const gameIds = gameJoinedEvents.map((e) => e.args.gameId);

    const promises: Promise<CoinTossGame.GameStructOutput>[] = [];
    for (const gameId of gameIds) {
      const promise = mainContractConnection.getGameById(gameId);
      promises.push(promise);
    }

    const games = await Promise.all(promises);
    setData(games);
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
            {`Game ID: ${gameId},` + ", xem chi tiết"}
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

  const handleClaim = async (gameId: bigint) => {
    try {
      showLoading();
      const result = await (await mainContractConnection?.claimReward(gameId))?.wait();
      toast.success(
        <div>
          <div className="mb-2">{`Nhận thưởng thành công !`}</div>
          <LinkNewTab href={format(process.env.NEXT_PUBLIC_TX_DETAIL_URL || "", result?.hash)}>
            {`Game ID: ${gameId}` + ", xem chi tiết"}
          </LinkNewTab>
        </div>
      );
      refreshData();
      refreshCurrentAccount();
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (mainContractConnection) {
      refreshData();
    }
  }, [mainContractConnection, currentAccount]);

  return (
    <div>
      <TableHistory data={data} onClickCancel={handleCancel} onClickClaim={handleClaim} />
    </div>
  );
};

export default ClientHistory;
