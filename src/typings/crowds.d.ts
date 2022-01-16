type AdaptedCrowd = Omit<CrowdApiType, 'price'> & {
  collected: number;
  percentage: number;
  price: number;
}

type DetailedCrowd = AdaptedCrowd & {
  myFound?: number;
  remained?: number;
  leftovers?: number;
}