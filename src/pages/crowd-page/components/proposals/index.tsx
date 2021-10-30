import React, { ReactElement } from 'react';

//#region styles
import { styled } from '@linaria/react';

import Proposal from '../proposal';
import VoteBlock from '../vote-block';

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

interface Props {
  proposals: IAdaptedProposal[];
  className?: string;
}

const Proposals = ({ proposals, className }: Props): ReactElement => {
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
      }) => (
        <Row>
          <Proposal title={title} description={description}/>
          <VoteBlock 
            forVote={voteFor} 
            againstVote={voteAgainst} 
            status={status}
            voteAgainstPercent={voteAgainstPercent}
            voteForPercent={voteForPercent}
            tokenName={tokenName}
          />
        </Row>
      ))}
    </Root>
  );
};

export default Proposals;
