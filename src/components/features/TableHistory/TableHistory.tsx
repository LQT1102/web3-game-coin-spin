import { CoinSide } from "@/components/base/CoinSide";
import { CopyWrapper } from "@/components/base/CopyWrapper";
import { useWeb3 } from "@/contexts/web3Context";
import { useClientTranslations } from "@/libs/i18n-client";
import { weiToETH, formatAddressView } from "@/utils/converter";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";

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
  const { t } = useClientTranslations();
  const { mainContractConnection, currentAccount } = useWeb3();

  const renderTableRowOption = (game: CoinTossGame.GameStructOutput) => {
    if (+game.status?.toString() === GAME_STATUS.Canceled) {
      return <div className="text-error">{t("GameCancelled")}</div>;
    } else if (+game.status?.toString() === GAME_STATUS.Waiting) {
      return (
        <button
          className="btn btn-error btn-sm h-[20px]"
          onClick={() => {
            onClickCancel(game.gameId);
          }}
        >
          {t("Cancel")}
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
              {t("ClaimReward")}
            </button>
          );
        } else {
          return <div className="text-success">{t("RewardClaimed")}</div>;
        }
      } else {
        return <div className="text-error">{t("YouLose")}</div>;
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
        return <div className="text-success">{t("Win")}</div>;
      } else {
        return <div className="text-error">{t("Lose")}</div>;
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
          <th>{t("Host")}</th>
          <th>{t("YourChoice")}</th>
          <th>{t("ETH_Amount")}</th>
          <th>{t("Result")}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((game) => {
          return (
            <tr key={game.gameId} className="hover">
              <th>{game.gameId}</th>
              <td>
                <CopyWrapper stringValue={game.player1}>{formatAddressView(game.player1)}</CopyWrapper>
              </td>
              <td>
                <CoinSide
                  isHeads={game.player1 === currentAccount?.account?.address ? game.player1Choice : !game.player1Choice}
                />
              </td>
              <td>{weiToETH(game.betAmount)} ETH</td>
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
