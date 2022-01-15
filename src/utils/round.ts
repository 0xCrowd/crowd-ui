import { toNumber } from "lodash";

export const round = (value: number, round: number): number => {
  return value;
};

export const fixedRound = (value: number, round = 1) =>
  value % 1 === 0 ? toNumber(value.toFixed(0)) : toNumber(value.toFixed(round));
