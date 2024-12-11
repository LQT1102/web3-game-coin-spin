import { ethers } from "ethers";

export interface GetProviderResult {
  provider?: ethers.BrowserProvider;
  signer?: ethers.JsonRpcSigner;
  status: string;
}

export interface ChangeNetworkParams {
  chainId: string;
  chainName?: string;
  nativeCurrency?: { name: string; symbol: string; decimals: number };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
}

/**
 * Lấy thông tin provider hiện tại
 * @returns
 */
const getProvider = async (): Promise<GetProviderResult> => {
  let signer: ethers.JsonRpcSigner;
  let provider: ethers.BrowserProvider;
  if (window.ethereum == null) {
    return {
      provider: undefined,
      signer: undefined,
      status: "PROVIDER_NOT_INSTALL",
    };
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    return {
      provider: provider,
      signer: signer,
      status: "OK",
    };
  }
};

const getAccounts = async (
  provider: ethers.BrowserProvider
): Promise<ethers.JsonRpcSigner[]> => {
  await provider.send("eth_requestAccounts", []);
  const accounts = await provider.listAccounts();
  return accounts;
};

/**
 * Gọi hàm chỉ đọc đến contract (Không tốn gas, confirm)
 * @param contract
 * @param functionName
 * @param args
 * @returns
 */
const callContractFunction = async (
  contract: ethers.Contract,
  functionName: string,
  args: any[]
): Promise<any> => {
  const result = await contract[functionName](...args);
  return result;
};

/**
 * Gọi hàm có liên quan đến transaction đến contract (Tốn gas, confirm)
 * @param contract
 * @param functionName
 * @param args
 * @param options
 * @returns
 */
const sendTransaction = async (
  contract: ethers.Contract,
  functionName: string,
  args: any[],
  options?: ethers.TransactionRequest
): Promise<ethers.TransactionReceipt> => {
  const transaction = await contract[functionName](...args);
  const receipt = await transaction.wait();
  return receipt;
};

const getCurrentNetwork = async (
  provider: ethers.BrowserProvider
): Promise<ethers.Network> => {
  const network = await provider.getNetwork();
  return network;
};

const switchNetwork = async (
  networkParams: ChangeNetworkParams
): Promise<void> => {
  if (!window.ethereum) {
    console.error("MetaMask is not installed.");
    return;
  }
  const { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls } =
    networkParams;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    console.log(`Switched to network with chainId: ${chainId}`);
  } catch (switchError) {
    // Nếu chưa thêm mạng, sẽ thêm mạng rồi chuyển đổi
    if ((switchError as any).code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls },
          ],
        });
        console.log(`Added and switched to network with chainId: ${chainId}`);
      } catch (addError) {
        console.error("Failed to add the network:", addError);
      }
    } else {
      console.error("Failed to switch network:", switchError);
    }
  }
};

export {
  callContractFunction,
  getAccounts,
  getCurrentNetwork,
  getProvider,
  switchNetwork,
  sendTransaction,
};
