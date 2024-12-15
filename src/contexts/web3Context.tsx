"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import {
  getAccounts,
  getCurrentNetwork,
  getProvider,
} from "@/utils/web3Helper";
import { useContract } from "./contractContext";

// Khởi tạo context
interface Web3ContextProps {
  provider: Nullable<ethers.BrowserProvider>;
  signer: Nullable<ethers.Signer>;
  accounts: Nullable<ethers.JsonRpcSigner[]>;
  network: Nullable<ethers.Network>;
  currentAccount: Nullable<ethers.JsonRpcSigner>;
}

const Web3Context = createContext<Web3ContextProps>({
  provider: null,
  signer: null,
  accounts: null,
  network: null,
  currentAccount: null,
});

// Hook để sử dụng Web3Context
export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<Nullable<ethers.BrowserProvider>>(null);
  const [signer, setSigner] = useState<Nullable<ethers.Signer>>(null);
  const [accounts, setAccounts] = useState<Nullable<ethers.JsonRpcSigner[]>>(null);
  const [network, setNetwork] = useState<Nullable<ethers.Network>>(null);
  const [currentAccount, setCurrentAccount] = useState<Nullable<ethers.JsonRpcSigner>>(null);

  const { chainId, address } = useContract();

  const initWeb3 = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = await getProvider();
        if (web3Provider.provider !== undefined) {
          setProvider(web3Provider.provider);

          const [network, accounts] = await Promise.all([
            getCurrentNetwork(web3Provider.provider),
            getAccounts(web3Provider.provider),
          ]);

          setNetwork(network);
          setAccounts(accounts);

          const account = accounts[0];
          // Lấy số dư của tài khoản
          setCurrentAccount(account);
        }

        if (web3Provider.signer) {
          setSigner(web3Provider.signer);
        }
      } catch (error) {
        console.error("Error accessing accounts or network:", error);
      }

      // Lắng nghe sự kiện thay đổi tài khoản
      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        //Update số dư
        const web3Provider = await getProvider();
        if (web3Provider.provider !== undefined) {
          const accounts = await getAccounts(web3Provider.provider);
          setAccounts(accounts);
          setCurrentAccount(accounts[0]);
        }
      });

      // Lắng nghe sự kiện thay đổi mạng
      window.ethereum.on("chainChanged", async (chainId: string) => {
        const web3Provider = await getProvider();
        if (web3Provider.provider !== undefined) {
          const network = await getCurrentNetwork(web3Provider.provider);
          setNetwork(network);
        }
      });
    }
  };

  console.log({ currentAccount });

  useEffect(() => {
    if (chainId && address && network && network.chainId?.toString() !== chainId) {
      //Update status app lỗi toàn app, show popup warning yêu cầu đổi mạng
      console.log({ chainId: network.chainId?.toString(), address });
    }
  }, [chainId, address, network]);

  useEffect(() => {
    initWeb3();

    // Clean up các listener khi component bị unmount
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, accounts, network, currentAccount }}>
      {children}
    </Web3Context.Provider>
  );
};
