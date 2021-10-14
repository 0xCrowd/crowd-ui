import React, { ReactElement } from 'react';

import Card from '@app/components/card';
import Title from '@components/title';
import Percentage from '@app/components/percentage';
import UserBadge from '@app/components/user-badge';
import Button from '@app/components/button';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { mb4 } from '@assets/styles/constants';

const card = css`
  height: 566px;
  width: 380px;
`;

const percentage = css`
  margin-bottom: 10px;
  margin-bottom: 18px;
`;

const button = css`
  height: 300px;
  width: 28px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 12px;
`;

const buttonContainer = css`
  height: 304px;
  width: 32px;
  margin-bottom: 18px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Badge = styled.div`
  height: 18px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #E8EEFF;
  border-radius: 15px;
  font-family: Inter;
  font-size: 8px;
  line-height: 18px;
  letter-spacing: 0.25px;
`;

const Description = styled.p`
  margin: 0;
  margin-bottom: 28px;
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #C5C5C5;
`;

const PriceBlock = styled.div`
  display: flex;
`;

const Icon = styled.div`
  height: 44px;
  width: 44px;
  margin-right: 12px;
  border-radius: 50%;
  background: #fff;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const Current = styled.p`
  margin: 0;
  margin-bottom: 8px;
  font-family: Inter;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const Price = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CollectedText = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

const CollectedValue = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  line-height: 36px;
`;

const Funds = styled.p`
  margin: 0;
  margin-bottom: 14px;
  font-family: Inter;
  font-weight: 800;
  font-size: 12px;
  line-height: 18px;
`;

const UserTitle = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`;
//#endregion

interface Props {
  partyName: string;
  description: string;
  price: number;
  tokenName: string;
}

const CrowdBlock = ({ partyName, description, price, tokenName }: Props): ReactElement => {
  return (
    <Card className={card}>
      <Header>
        <Title>{partyName}</Title>
        <Badge>{tokenName}</Badge>
      </Header>
      <Description>{description}</Description>
      <PriceBlock>
        <Icon />
        <PriceInfo>
          <Current>Current price</Current>
          <Price>ETH 1000</Price>
        </PriceInfo>
      </PriceBlock>
      <Row>
        <CollectedText>Collected</CollectedText>
        <CollectedText>Participants</CollectedText>
      </Row>
      <Row>
        <CollectedValue>80%</CollectedValue>
        <CollectedValue>1111</CollectedValue>
      </Row>
      <Percentage number={80} className={percentage} />
      <Button className={button} containerClassName={buttonContainer} active>+ Add funds</Button>
      <Funds>Your funds: 3% / 0.5 ETH</Funds>
      <hr />
      <UserTitle>
        <UserBadge number="1000" name="User" className={mb4} />
        <UserBadge number="1000" name="User" className={mb4} />
        <UserBadge number="1000" name="User" className={mb4} />
      </UserTitle>
    </Card>
  )
}

export default CrowdBlock
