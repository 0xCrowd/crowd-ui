import { ProposalStatusEnum } from '../enums/proposal-status-enum/index';

declare global {
  interface IDeposits {
    address: string,
    total_deposit: number,
  }
  
  interface IDao {
    ceramic_stream: string;
    deposits: IDeposits[]
    l1_type: string;
    l1_vault: string;
    l1_token: string;
    proposals_registry: string;
    buyout_target: string;
  }
  
  interface IAdaptedDao {
    ceramic_stream: string;
    price: number;
    image: string;
    collected: number;
    users: IDeposits[];
    percentage: number;
    partyName: string;
    description: string;
    myPaid?: IDeposits;
  }
  
  interface IProposal {
    ceramic_stream: string;
    dao: string;
    description: string;
    fulfilled: false
    onsuccess: string;
    options: string[];
    status: ProposalStatusEnum;
    title: string;
  }
  
  interface IAdaptedProposal extends IProposal{
    voteFor: number;
    voteAgainst: number;
    voteForPercent: number;
    voteAgainstPercent: number;
    tokenName?: string;
  }
}
