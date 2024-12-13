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

// Khởi tạo context
interface Web3ContextProps {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  accounts: ethers.JsonRpcSigner[] | null;
  network: ethers.Network | null;
}

const Web3Context = createContext<Web3ContextProps>({
  provider: null,
  signer: null,
  accounts: null,
  network: null,
});

// Hook để sử dụng Web3Context
export const useWeb3 = () => useContext(Web3Context);

// Provider để bao bọc ứng dụng của bạn
export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [accounts, setAccounts] = useState<ethers.JsonRpcSigner[] | null>(null);
  const [network, setNetwork] = useState<ethers.Network | null>(null);

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
        }

        if (web3Provider.signer) {
          setSigner(web3Provider.signer);
        }
      } catch (error) {
        console.error("Error accessing accounts or network:", error);
      }

      // Lắng nghe sự kiện thay đổi tài khoản
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        debugger;
      });

      // Lắng nghe sự kiện thay đổi mạng
      window.ethereum.on("chainChanged", async (chainId: string) => {
        debugger;
      });
    }
  };

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
    <Web3Context.Provider value={{ provider, signer, accounts, network }}>
      {children}
    </Web3Context.Provider>
  );
};
