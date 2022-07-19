import { getData } from './looksRare';
import { getProposals, createProposal, makeProposalVote } from './proposals';
import { makeWithdraw } from './transactions';
import { getCrowds, getCrowd, getCrowdPreview, createCrowd } from './crowd';

const api = {
  crowd: {
    getCrowds,
    getCrowd,
    getCrowdPreview,
    createCrowd
  },
  transactions: {
    makeWithdraw
  },
  proposal: {
    getProposals,
    createProposal,
    makeProposalVote
  },
  looksRare: {
    getData,
  }
}

export {
  api
};