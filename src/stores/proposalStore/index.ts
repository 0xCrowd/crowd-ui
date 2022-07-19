import { toWei } from './../../utils/toWei';
import BigNumber from "bignumber.js";
import { makeAutoObservable, runInAction } from "mobx";

import chainStore from "@stores/chainStore";

import { StateEnum } from "@enums/state-enum/index";
import { ProposalChoice } from "@app/enums/proposal-choice-enum";
import { notify } from "@app/utils/notify";
import { toEth } from "@app/utils/toEth";
import { toNumber } from "lodash";
import { api } from "@app/api";

class ProposalStore {
  constructor() {
    makeAutoObservable(this);
  }

  proposalState = StateEnum.Empty;
  createProposalState = StateEnum.Empty;
  proposalPage: number = 0;
  proposalLimit: number = 10;
  proposalsList: AdaptedProposal[] = [];

  voteState = StateEnum.Empty;

  getProposals = async (crowdId: string) => {
    try {
      runInAction(() => {
        this.proposalState = StateEnum.Loading;
      });

      const { address } = chainStore;

      const response = await api.proposal.getProposals({
        crowd: toNumber(crowdId),
        address,
        network: "ethereum"
      });

      const newProposals: AdaptedProposal[] = response.data.map((item: ProposalApiType) => {
        return this.adaptProposal(item);
      });

      runInAction(() => {
        this.proposalsList = newProposals;
        this.proposalState = StateEnum.Success;
      });
    } catch (error: any) {
      this.proposalState = StateEnum.Error;
      throw error;
    }
  };

  adaptProposal = ({ proposal, vote }: ProposalApiType): AdaptedProposal => {
    let type: VotingType = 'liveNotVote';
    if (proposal.status === 'canceled') {
      type = 'noSuccess';
    } else if (proposal.status === 'completed') {
      type = 'success';
    } else if (vote.already_voted) {
      if (vote.choice === 'for') {
        type = 'liveVoteFor';
      } else if (vote.choice === 'against') {
        type = 'liveVoteAgainst';
      }
    }

    return {
      priceEth: toEth(proposal.average_price),
      priceWei: new BigNumber(proposal.average_price),
      type,
      id: proposal.id,
      till: '2022-10-30',
      against: toNumber(proposal.reached_quorum_against) * 100,
      all: toNumber(proposal.reached_quorum) * 100,
      myVote: toEth(vote.price)
    };
  };

  createProposal = async (crowdId: string, price: string) => {
    try {
      const { address } = chainStore;
      runInAction(() => {
        this.createProposalState = StateEnum.Loading;
      });

      await api.proposal.createProposal({
        crowd: toNumber(crowdId),
        user: address,
        price: toWei(price),
      });

      runInAction(() => {
        this.createProposalState = StateEnum.Success;
      });
    } catch (error: any) {
      notify(error.message);
      this.createProposalState = StateEnum.Error;
    }
  };

  makeVote = async (proposalId: number, choice: ProposalChoice, amount: string) => {
    try {
      runInAction(() => {
        this.voteState = StateEnum.Loading;
      });

      const { address } = chainStore;

      await api.proposal.makeProposalVote(
        {
          user: address,
          proposal: proposalId,
          choice,
          price: toWei(amount)
        }
      );

      runInAction(() => {
        this.voteState = StateEnum.Success;
      });
    } catch (error: any) {
      runInAction(() => {
        notify(error.message);
        this.voteState = StateEnum.Error;
      });
    }
  };
}

export default new ProposalStore();
