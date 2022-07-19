import { makeCrowdApiRequest as makeRequest } from './makeRequest';

export const makeWithdraw = async (data: WithdrawData) => {
  return await makeRequest<WithdrawResponse>(
    {
      method: 'post',
      url: 'withdraw',
      data
    }
  );
};
