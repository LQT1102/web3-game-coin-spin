import Image from "next/image";
import React from "react";

type Props = {
  isHeads: boolean;
};

const CoinSide = ({ isHeads }: Props) => {
  return (
    <div className="flex gap-2">
      {isHeads ? (
        <>
          <Image src={"/images/Coin-Heads.png"} alt="Heads" height={24} width={24} />
          <span className="flex items-center">Heads</span>
        </>
      ) : (
        <>
          <Image src={"/images/Coin-Tails.png"} height={24} alt="Tails" width={24} />
          <span className="flex items-center">Tails</span>
        </>
      )}
    </div>
  );
};

export default CoinSide;
