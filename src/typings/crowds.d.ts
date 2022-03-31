import BigNumber from "bignumber.js";

declare global {
  type AdaptedDeposits = {
    address: string;
    totalDepositWei: BigNumber;
    totalDepositEth: number;
  };

  type AdaptedCrowd = Pick<
    CrowdApiType,
    "id" | "status" | "deposits"
  > & Pick<CrowdTarget, "name" | "media"> &
  {
      priceEth: number;
      percentage: number;
  };

  type DetailedCrowd = Omit<AdaptedCrowd, 'deposits'> & {
    priceWei: BigNumber;
    collectedEth: number;
    collectedWei: BigNumber;
    myFoundEth?: number;
    myFoundWei?: BigNumber;
    remained?: number;
    leftovers?: number;
    item: string;
    deposits: AdaptedDeposits[];
  };
}
