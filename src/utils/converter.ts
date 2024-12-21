//Các hàm dùng convert giá trị
import { ethers } from "ethers";

/**
 * Lấy ra dạng hiển thị là string của 1  số bigint (Không được dùng để tính toán)
 * @param bigint
 * @returns
 */
export const bigintToResultView = (bigint: bigint) => {
  return ethers.formatEther(bigint);
};

/**
 * Format định dạng ví hiển thị
 * @param address
 * @returns
 */
export const formatAddressView = (address: string) => {
  if (address.length < 8) {
    return address;
  }
  return address.substring(0, 4) + "..." + address.substring(address.length - 4);
};
