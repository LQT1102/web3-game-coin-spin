"use client";
import Address from "@/components/base/Address/Address";
import CoinSide from "@/components/base/CoinSide/CoinSide";
import { useWeb3 } from "@/contexts/web3Context";
import { bigintToResultView, formatAddressView, transformWeb3Response } from "@/utils/converter";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";
import React, { useEffect, useState } from "react";

type Props = {};

const TableAvailableGames = (props: Props) => {
  const { mainContractConnection } = useWeb3();
  const [data, setData] = useState<CoinTossGame.GameStructOutput[]>();

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
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Game ID</th>
          <th>Host Address</th>
          <th>Host's Choice</th>
          <th>Bet Amount</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((game) => {
          return (
            <tr key={game.gameId} className="hover">
              <th>{game.gameId}</th>
              <td>
                <Address address={game.player1} />
              </td>
              <td>
                <CoinSide isHeads={game.player1Choice} />{" "}
              </td>
              <td>{bigintToResultView(game.betAmount)} ETH</td>
              <td>
                <button className="btn btn-success btn-sm h-[20px]">Join</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableAvailableGames;
