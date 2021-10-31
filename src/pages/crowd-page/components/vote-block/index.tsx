import React, { ReactElement } from 'react';

import Card from '@components/card';
import Title from '@components/title';
import Percentage from '@components/percentage';
import Button from '@components/button';

import { ProposalStatusEnum } from '@enums/proposal-status-enum/index';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

const Text = styled.p`
  margin: 0;
  line-height: 20px;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
`;

const BoldText = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 800;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 4px;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const card = css`
  height: 192px;
  width: 380px;
  padding-top: 18px;
  padding-bottom: 18px;
`;

const lightButton = css`
  height: 28px;
  width: 136px;
`;

const lightContainer = css`
  height: 32px;
  width: 140px;
`;

const button = css`
  height: 32px;
  border: 2px solid #FF1CF7;
  width: 140px;
`;

const buttonContainer = css`
  height: 32px;
  width: 140px;
`;

const percentage = css`
  box-sizing: border-box;
  height: 32px;
  padding: 12px 22px;
  background: #263238;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.4);
  border-radius: 10px;
`;

const main = css`
  height: 8px;
  background: #FF1CF7;
`;

const percent = css`
  height: 8px;
  background: #00F0FF;
`;
//#endregion

interface Props {
  forVote: number;
  againstVote: number;
  voteAgainstPercent: number;
  voteForPercent: number;
  tokenName?: string;
  status: ProposalStatusEnum;
  ceramicStream: string;
  onVoteFor: () => void;
}

const VoteBlock = ({ 
  forVote,
  againstVote,
  voteForPercent,
  voteAgainstPercent,
  status,
  tokenName,
  ceramicStream,
  onVoteFor,
}: Props): ReactElement => {
  return (
    <Card className={card}>
      <Title>Voting</Title>
      <TextRow>
        <Text>For</Text>
        <Text>Against</Text>
      </TextRow>
      <Percentage number={voteForPercent} className={percentage} mainClassName={main} precentClassName={percent} />
      <ValueRow>
        <BoldText>{`${voteForPercent}%`}</BoldText>
        <BoldText>{`${voteAgainstPercent}%`}</BoldText>
      </ValueRow>
      {status !== ProposalStatusEnum.Success && <ButtonRow>
        <Button 
          className={lightButton} 
          containerClassName={lightContainer} 
          mode="light"
          active
          onClick={onVoteFor}
        >Vote For</Button>
        <Button className={button} containerClassName={buttonContainer}>Vote Against</Button>
      </ButtonRow>}
    </Card>
  );
};

export default VoteBlock;
