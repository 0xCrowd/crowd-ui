import { toNumber } from "lodash"

export const toEth = (value: string) => {
  return toNumber(window.web3.utils.fromWei(value, 'ether'));
};
