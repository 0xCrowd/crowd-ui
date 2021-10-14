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
`;
//#endregion

interface Props {
  proposals: any[];
}

const Proposals = ({ proposals }: Props): ReactElement => {
  return (
    <Root>
      {proposals.map((item: any) => (
        <Row>
          <Proposal title={item.title} description={item.description}/>
          <VoteBlock forVote={item.forVote} againstVote={item.againstVote} tokenName={item.tokenName} />
        </Row>
      ))}
    </Root>
  );
};

export default Proposals;
