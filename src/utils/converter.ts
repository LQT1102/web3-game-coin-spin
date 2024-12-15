import { ethers } from "ethers";

/**
 * Lấy ra dạng hiển thị là string của 1  số bigint (Không được dùng để tính toán)
 * @param bigint
 * @returns
 */
export const bigintToResultView = (bigint: bigint) => {
  return ethers.formatEther(bigint);
};
