import React, { ReactElement } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import Card from '@app/components/card';
import Title from '@components/title';
import Percentage from '@app/components/percentage';
import UserBadge from '@app/components/user-badge';
import Button from '@app/components/button';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { mb4 } from '@assets/styles/constants';

import eth from '@assets/images/eth_gr.png';

const title = css`
  height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const card = css`
  box-sizing: border-box;
  height: 566px;
  width: 380px;
`;

const percentage = css`
  box-sizing: border-box;
  height: 32px;
  padding: 12px 22px;
  margin-top: 10px;
  margin-bottom: 18px;
`;

const percentRow = css`
  height: 8px;
`;

const percent = css`
  height: 8px;
`;

const button = css`
  width: 300px;
  height: 28px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 12px;
`;

const buttonContainer = css`
  flex-shrink: 0;
  height: 32px;
  width: 304px;
  margin-bottom: 18px;
`;

const smallButton = css`
  width: 144px;
  height: 28px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 12px;
`;

const smallButtonContainer = css`
  flex-shrink: 0;
  height: 32px;
  width: 148px;
  margin-bottom: 18px;
`;

const userText = css`
  font-size: 10px;
  line-height: 20px;
  color: #C5C5C5;
`;

const scroller = css`
  height: 60px;
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
  flex-shrink: 0;
  max-height: 56px;
  margin: 0;
  margin-bottom: 28px;
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #C5C5C5;
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
`;

const PriceBlock = styled.div`
  display: flex;
`;

const Icon = styled.img`
  height: 44px;
  width: 44px;
  margin-right: 12px;
  border-radius: 50%;
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
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
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
  color: #fff;
`;

const CollectedValue = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
`;

const Funds = styled.p`
  margin: 0;
  margin-bottom: 14px;
  font-family: Inter;
  font-weight: 800;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
`;

const UserTitle = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
`;

const Hr = styled.div`
  width: 100%;
  height: 0.5px;
  margin-bottom: 14px;
  background: linear-gradient(97.56deg, #00F0FF 8.07%, #FF1CF7 91.93%);
`;
//#endregion

interface Props {
  partyName: string;
  description: string;
  price: number;
  tokenName?: string;
  collected: number;
  participants: IDeposits[];
  myPaid?: IDeposits;
  onAddClick: () => void;
  onWithdrawClick: () => void;
}

const CrowdBlock = ({ 
  partyName,
  description,
  price,
  tokenName,
  collected,
  participants,
  myPaid,
  onAddClick,
  onWithdrawClick,
}: Props): ReactElement => {
  return (
    <Card className={card}>
      <Header>
        <Title className={title}>{partyName}</Title>
        <Badge>{tokenName}</Badge>
      </Header>
      <Description>{description}</Description>
      <PriceBlock>
        <Icon src={eth} alt="eth" />
        <PriceInfo>
          <Current>Current price</Current>
          <Price>ETH {price}</Price>
        </PriceInfo>
      </PriceBlock>
      <Row>
        <CollectedText>Collected</CollectedText>
        <CollectedText>Participants</CollectedText>
      </Row>
      <Row>
        <CollectedValue>{parseInt(`${collected}`)}%</CollectedValue>
        <CollectedValue>{participants?.length}</CollectedValue>
      </Row>
      <Percentage 
        number={collected} 
        className={percentage}
        mainClassName={percentRow}
        precentClassName={percent}
      />
      {participants?.length ? (
        <Row>
          <Button className={smallButton} containerClassName={smallButtonContainer} active onClick={onAddClick}>+ Add</Button>
          <Button className={smallButton} containerClassName={smallButtonContainer} active onClick={onWithdrawClick}>- Withdraw</Button>
        </Row>
      ) : (
        <Button className={button} containerClassName={buttonContainer} active onClick={onAddClick}>+ Add funds</Button>
      )}
      <Funds>Your funds: {myPaid?.total_deposit || 0} ETH</Funds>
      <Hr />
      {participants?.length > 0 && <UserTitle>User party name</UserTitle>}
      <Scrollbars className={scroller}>
        {participants?.length > 0 && participants.map(({ address, total_deposit }) => {
          return <UserBadge 
            key={address} 
            number={total_deposit} 
            name={address} 
            className={mb4} 
            textClassName={userText}
          />
        })}
      </Scrollbars>
    </Card>
  )
}

export default CrowdBlock
