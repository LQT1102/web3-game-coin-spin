"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//Context lưu các thông tin về main contact đang được chọn dùng trong app
interface ContractContextProps {
  address: Nullable<string>;
  abi: any;
  chainId: Nullable<string>;
  networkName: Nullable<string>;
  rpcUrl: Nullable<string>;
}

const ContractContext = createContext<Partial<ContractContextProps>>({
  abi: null,
  address: null,
  chainId: null,
  networkName: null,
  rpcUrl: null,
});

export const useContract = () => useContext(ContractContext);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [mainContract, setMainContract] =
    useState<Partial<ContractContextProps>>();

  const init = () => {
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID as Nullable<string>;
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    setMainContract({ address: contractAddress, chainId: chainId });
  };

  useEffect(() => {
    init();

    // Clean up các listener khi component bị unmount
    return () => {};
  }, []);

  return (
    <ContractContext.Provider value={{ ...mainContract }}>
      {children}
    </ContractContext.Provider>
  );
};
