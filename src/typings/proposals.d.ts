type VotingType = "liveNotVote"
  | "liveVoteFor"
  | "liveVoteAgainst"
  | "success"
  | "noSuccess";

type AdaptedProposal = {
  proposal: string;
	timeLeft: string;
	price: string;
  type: VotingType;
  votingPower: string;
  options: string[];
}