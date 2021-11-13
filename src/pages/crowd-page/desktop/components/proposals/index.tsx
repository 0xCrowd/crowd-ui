import React, { ReactElement } from 'react';
import SkeletonLoader from "tiny-skeleton-loader-react";

import Proposal from '../proposal';
import VoteBlock from '../vote-block';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 1220px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
`;
//#endregion

//#region const
const SKELETON_ROWS = [
  {
    proposal: {
      width: 800,
      height: 192,
      styles: { marginRight: 40 }
    },
    vote: {
      width: 380,
      height: 192,
    },
  },
  {
    proposal: {
      width: 800,
      height: 192,
      styles: { marginRight: 40 }
    },
    vote: {
      width: 380,
      height: 192,
    },
  },
  {
    proposal: {
      width: 800,
      height: 192,
      styles: { marginRight: 40 }
    },
    vote: {
      width: 380,
      height: 192,
    },
  },
]
//#endregion

interface Props {
  proposals: IAdaptedProposal[];
  makeVote: (proposalStream: string, option: number, amount: string) => void;
  loading: boolean;
  className?: string;
}

const Proposals = ({ proposals, makeVote, loading, className }: Props): ReactElement => {
  if (loading) {
    return (
      <Root className={className}>
        {SKELETON_ROWS.map(({ proposal, vote }, index) => (
          <Row key={index}>
            <SkeletonLoader {...proposal} background="linear-gradient(0deg,#263238,#263238)"/>
            <SkeletonLoader {...vote} background="linear-gradient(0deg,#263238,#263238)"/>
          </Row>
        ))}
      </Root>
    )
  }
  return (
    <Root className={className}>
      {proposals.map(({
        title, 
        description,
        voteAgainst,
        voteFor,
        voteAgainstPercent,
        voteForPercent,
        status,
        tokenName,
        ceramic_stream,
        type,
      }) => (
        <Row key={title}>
          <Proposal title={title} description={description} type={type} />
          <VoteBlock
            ceramicStream={ceramic_stream}
            voteFor={voteFor} 
            againstVote={voteAgainst} 
            status={status}
            voteAgainstPercent={voteAgainstPercent}
            voteForPercent={voteForPercent}
            tokenTicker={tokenName}
            onVoteFor={() => makeVote(ceramic_stream, 0, '0')}
            onVoteAgainst ={() => makeVote(ceramic_stream, 1, '0')}
          />
        </Row>
      ))}
    </Root>
  );
};

export default Proposals;
