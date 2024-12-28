import { Address } from "@/components/base/Address";
import { CoinSide } from "@/components/base/CoinSide";
import { bigintToResultView } from "@/utils/converter";
import { CoinTossGame } from "@root/types/ethers-contracts/MainContractAbi";

type Props = {
  data: CoinTossGame.GameStructOutput[];
  currentAccount: string;
  onClickJoin: Function;
  onClickCancel: Function;
};

const TableAvailableGames = ({ data, currentAccount, onClickCancel, onClickJoin }: Props) => {
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
                  {checkCanJoin(game.player1) ? (
                    <button
                      className="btn btn-success btn-sm h-[20px]"
                      onClick={() => {
                        onClickJoin(game.gameId);
                      }}
                    >
                      Join
                    </button>
                  ) : (
                    <button
                      className="btn btn-error btn-sm h-[20px]"
                      onClick={() => {
                        onClickCancel(game.gameId);
                      }}
                    >
                      Cancel
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
