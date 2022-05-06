import BigNumber from "bignumber.js";

declare global {
  type VotingType =
    | "liveNotVote"
    | "liveVoteFor"
    | "liveVoteAgainst"
    | "success"
    | "noSuccess";

  type AdaptedProposal = {
    id: number;
    till: string;
    priceWei: BigNumber;
    priceEth: number;
    type: VotingType;
    against: number;
    all: number;
    myVote?: number;
  };
}
