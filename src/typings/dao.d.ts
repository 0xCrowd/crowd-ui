import { ProposalTypeEnum } from './../enums/proposalTypeEnum/index';
import { ProposalStatusEnum } from '../enums/proposal-status-enum/index';

declare global {
  interface IDeposits {
    address: string,
    total_deposit: number,
  }

  interface IImageMeta {
    height: number
    type: string
    width: number
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
    imageMeta: IImageMeta;
    tokenTicker?: string;
    isBuyied?: boolean;
  }
  
  interface IProposal {
    ceramic_stream: string;
    dao: string;
    description: string;
    fulfilled: boolean;
    onsuccess: string;
    options: string[];
    status: ProposalStatusEnum;
    title: string;
    type: ProposalTypeEnum;
  }
  
  interface IAdaptedProposal extends IProposal{
    voteFor: number;
    voteAgainst: number;
    voteForPercent: number;
    voteAgainstPercent: number;
    tokenName?: string;
  }
}
