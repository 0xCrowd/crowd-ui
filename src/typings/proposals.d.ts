import BigNumber from "bignumber.js";

declare global {
  type VotingType =
    | "liveNotVote"
    | "liveVoteFor"
    | "liveVoteAgainst"
    | "success"
    | "noSuccess";

  type AdaptedProposal = {
    proposal: string;
    till: string;
    price: BigNumber;
    type: VotingType;
    votingPower: string;
    options: string[];
    voted?: number;
    against?: number;
  };
}
