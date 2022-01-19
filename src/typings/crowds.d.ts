import BigNumber from "bignumber.js";

declare global {
  type AdaptedCrowd = Omit<CrowdApiType, 'price'> & {
    collected: number;
    percentage: number;
    price: number;
    priceWei: BigNumber;
    collectedWei: BigNumber
  }
  
  type DetailedCrowd = AdaptedCrowd & {
    myFound?: number;
    myFoundWei?: BigNumber;
    remained?: number;
    leftovers?: number;
  }
}
