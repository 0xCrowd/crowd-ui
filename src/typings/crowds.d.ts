import BigNumber from "bignumber.js";

declare global {
  type AdaptedCrowd = Pick<
    CrowdApiType,
    "id" | "status" | "deposits" | "fundraising"
  > & Pick<CrowdTarget, "name" | "media"> &
  {
      priceEth: number;
      percentage: number;
  };

  type DetailedCrowd = AdaptedCrowd & {
    priceWei: BigNumber;
    collectedEth: number;
    collectedWei: BigNumber;
    myFoundEth?: number;
    myFoundWei?: BigNumber;
    remained?: number;
    leftovers?: number;
    item: string;
  };
}
