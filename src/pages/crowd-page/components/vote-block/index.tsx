import React, { ReactElement } from 'react';

import Card from '@components/card';
import Title from '@components/title';
import Percentage from '@components/percentage';
import Button from '@components/button';

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
  margin-top: 8px;
`;

const card = css`
  height: 192px;
  width: 380px;
  padding-top: 18px;
  padding-bottom: 18px;
`;

const lightButton = css`
  height: 28px;
`;

const lightContainer = css`
  height: 32px;
`;

const button = css`
  height: 32px;
  border: 2px solid #FF1CF7;
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
  forVote: string;
  againstVote: string;
  tokenName: string
}

const VoteBlock = ({ forVote, againstVote, tokenName }: Props): ReactElement => {
  return (
    <Card className={card}>
      <Title>Voting</Title>
      <TextRow>
        <Text>For</Text>
        <Text>Against</Text>
      </TextRow>
      <Percentage number={10} className={percentage} mainClassName={main} precentClassName={percent} />
      <ValueRow>
        <BoldText>3% / 0.5 Rari</BoldText>
        <BoldText>3% / 0.5 Rari</BoldText>
      </ValueRow>
      <ButtonRow>
        <Button className={lightButton} containerClassName={lightContainer}>Vote For</Button>
        <Button className={button}>Vote Against</Button>
      </ButtonRow>
    </Card>
  );
};

export default VoteBlock;
