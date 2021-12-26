type AdaptedCrowd = CrowdApiType & {
  collected: number;
  percentage: number;
}

type DetailedCrowd = AdaptedCrowd & {
  myFound?: number;
  remained?: number;
  leftovers?: number;
}