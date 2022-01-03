type VotingType = "liveNotVote"
  | "liveVoteFor"
  | "liveVoteAgainst"
  | "success"
  | "noSuccess";

type AdaptedProposal = {
  proposal: string;
	till: string;
	price: string;
  type: VotingType;
  votingPower: string;
  options: string[];
  voted?: number;
  against?: number;
}