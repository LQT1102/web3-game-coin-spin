//Các hàm dùng convert giá trị
import { ethers } from "ethers";

/**
 * Lấy ra dạng hiển thị là string của 1  số bigint (Không được dùng để tính toán)
 * @param bigint
 * @returns
 */
export const bigintToResultView = (bigint: any) => {
  if (!bigint) return 0;
  return ethers.formatEther(bigint);
};

/**
 * Format định dạng ví hiển thị
 * @param address
 * @returns
 */
export const formatAddressView = (address: string, sub: number = 6) => {
  if (address.length < 8) {
    return address;
  }
  return address.substring(0, sub) + "..." + address.substring(address.length - sub);
};

export const transformWeb3Response = function transformWeb3Response<T>(response: any): T {
  if (typeof response === "bigint") {
    return response.toString() as any;
  }

  if (Array.isArray(response)) {
    return response.map(transformWeb3Response) as any;
  }

  if (response && typeof response === "object") {
    if (response._isIndexed) {
      return transformWeb3Response(response.toObject());
    }

    const newObj: { [key: string]: any } = {};
    for (const key in response) {
      newObj[key] = transformWeb3Response(response[key]);
    }
    return newObj as any;
  }

  return response;
};