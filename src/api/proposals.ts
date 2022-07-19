import { makeCrowdApiRequest as makeRequest } from './makeRequest';

const API_PARAM = "proposal";

export const getProposals = async (data: ProposalData) => {
  return await makeRequest<ProposalApiType[]>(
    {
      method: 'post',
      url: API_PARAM,
      data
    }
  );
};

export const createProposal = async (data: CreateProposalData) => {
  return await makeRequest<CreateProposalResponse>({
    method: 'post',
    url: `${API_PARAM}/new`,
    data
  })
};

export const makeProposalVote = async (data: MakeProposalVoteData) => {
  return await makeRequest({
    method: 'post',
    url: `${API_PARAM}/vote/new`,
    data
  });
};
