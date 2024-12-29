import { Address } from "@/components/base/Address";
import { CoinSide } from "@/components/base/CoinSide";
import { useWeb3 } from "@/contexts/web3Context";
import { bigintToResultView } from "@/utils/converter";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";
import React from "react";

type Props = {
  data: CoinTossGame.GameStructOutput[];
  onClickCancel: Function;
  onClickClaim: Function;
};

const GAME_STATUS = {
  Waiting: 0,
  Finished: 1,
  Canceled: 2,
};

const TableHistory = ({ data, onClickCancel, onClickClaim }: Props) => {
  const { mainContractConnection, currentAccount } = useWeb3();

  const renderTableRowOption = (game: CoinTossGame.GameStructOutput) => {
    if (+game.status?.toString() === GAME_STATUS.Canceled) {
      return <div className="text-error">Game đã huỷ</div>;
    } else if (+game.status?.toString() === GAME_STATUS.Waiting) {
      return (
        <button
          className="btn btn-error btn-sm h-[20px]"
          onClick={() => {
            onClickCancel(game.gameId);
          }}
        >
          Cancel
        </button>
      );
    } else if (+game.status?.toString() === GAME_STATUS.Finished) {
      if (
        (game.isWinnerPlayer1 && game.player1 === currentAccount?.account?.address) ||
        (!game.isWinnerPlayer1 && game.player1 !== currentAccount?.account?.address)
      ) {
        if (!game.claimed) {
          return (
            <button
              className="btn btn-success btn-sm h-[20px]"
              onClick={() => {
                onClickClaim(game.gameId);
              }}
            >
              Nhận thưởng
            </button>
          );
        } else {
          return <div className="text-success">Đã nhận thưởng</div>;
        }
      } else {
        return <div className="text-error">Bạn đã thua</div>;
      }
    }
  };

  const renderYourResult = (game: CoinTossGame.GameStructOutput) => {
    if (+game.status?.toString() === GAME_STATUS.Finished) {
      if (
        // Là người 1 và người 1 thắng
        (game.isWinnerPlayer1 && game.player1 === currentAccount?.account?.address && game.isWinnerPlayer1) ||
        //Là người 2 và người 2 thắng
        (!game.isWinnerPlayer1 && game.player1 !== currentAccount?.account?.address)
      ) {
        return <div className="text-success">Thắng</div>;
      } else {
        return <div className="text-error">Thua</div>;
      }
    } else {
      return <></>;
    }
  };

  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Game ID</th>
          <th>Host Address</th>
          <th>Your Choice</th>
          <th>Bet Amount</th>
          <th>Result</th>
          <th></th>
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
                <CoinSide
                  isHeads={game.player1 === currentAccount?.account?.address ? game.player1Choice : !game.player1Choice}
                />
              </td>
              <td>{bigintToResultView(game.betAmount)} ETH</td>
              <td>{renderYourResult(game)}</td>
              <td>{renderTableRowOption(game)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableHistory;
