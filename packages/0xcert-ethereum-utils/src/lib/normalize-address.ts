import { getAddress } from 'ethers/utils/address';

/**
 * 
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
 */
export function normalizeAddress(address: string) {
  return getAddress(address);
}
