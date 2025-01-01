import { CoinSide } from "@/components/base/CoinSide";
import { CopyWrapper } from "@/components/base/CopyWrapper";
import { useClientTranslations } from "@/libs/i18n-client";
import { weiToETH, formatAddressView } from "@/utils/converter";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";

type Props = {
  data: CoinTossGame.GameStructOutput[];
  currentAccount: string;
  onClickJoin: Function;
  onClickCancel: Function;
};

const TableAvailableGames = ({ data, currentAccount, onClickCancel, onClickJoin }: Props) => {
  const { t } = useClientTranslations();
  const checkCanJoin = (address: string) => {
    return address !== currentAccount;
  };

  return (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Game ID</th>
            <th>{t("Host")}</th>
            <th>{t("HostChoice")}</th>
            <th>{t("ETH_Amount")}</th>
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
                  <CoinSide isHeads={game.player1Choice} />{" "}
                </td>
                <td>{weiToETH(game.betAmount)} ETH</td>
                <td>
                  {checkCanJoin(game.player1) ? (
                    <button
                      className="btn btn-info btn-sm h-[20px]"
                      onClick={() => {
                        onClickJoin(game.gameId);
                      }}
                    >
                      {t("Join")}
                    </button>
                  ) : (
                    <button
                      className="btn btn-error btn-sm h-[20px]"
                      onClick={() => {
                        onClickCancel(game.gameId);
                      }}
                    >
                      {t("Cancel")}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableAvailableGames;
