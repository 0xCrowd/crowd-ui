import React from "react";

import Percentage from '@app/components/percentage';
import Button from "@app/components/button";
import { Hr } from "@app/components/hr";
import UserBadge from "@app/components/user-badge";

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import eth from '@assets/images/eth_gr.png';


const CrowdInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 28px;
`;

const CrowdTitle = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
`;

const Badge = styled.div`
  height: 18px;
  width: 70px;
  margin-bottom: 12px;
  background: #263238;
  border-radius: 15px;
  color: #fff;
  font-family: Inter;
  font-size: 8px;
  line-height: 18px;
  text-align: center;
`;

const Description = styled.div`
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #C5C5C5;
`;

const PriceBlock = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

const Eth = styled.img`
  height: 44px;
  width: 44px;
  margin-right: 12px;
`;

const PriceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Current = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
  font-family: Inter;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #979797;
`;

const Price = styled.div`
  font-family: Inter;
  font-weight: bold;
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

const Label = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #979797;
`;

const Value = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
`;

const FundsLabel = styled.p`
  margin: 18px 0;
  font-family: Inter;
  font-weight: 800;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
`;

const UsersTitle = styled.p`
  margin-top: 16px;
  margin-bottom: 0;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
`;

const percentage = css`
  box-sizing: border-box;
  height: 44px;
  margin-top: 10px;
  margin-bottom: 18px;
  padding: 16.5px 22px;
  border-radius: 30px;
`;

const mainPercentage = css`
  height: 11px;
`;

const percent = css`
  height: 11px;
`;

const buttonContainer = css`
  height: 44px;
  width: 100%;
  border-radius: 30px;
`;

const button = css`
  height: 40px;
  width: calc(100% - 4px);
  border-radius: 30px;
`;

const userText = css`
  color: #C5C5C5;
  line-height: 20px;
`;

const hr = css`
  height: 1px;
`;
//#endregion

const CrowdTab = () => {
  return (
    <>
      <CrowdInfo>
        <CrowdTitle>Qroud Party</CrowdTitle>
        <Badge>Holder</Badge>
        <Description>
          asdasd asdasd adasd adas asdas asd asdadas asd
        </Description>
      </CrowdInfo>
      <PriceBlock>
        <Eth src={eth} alt="eth" />
        <PriceColumn>
          <Current>Current price</Current>
          <Price>1000 ETH</Price>
        </PriceColumn>
      </PriceBlock>
      <Row>
        <Label>Collected</Label>
        <Label>Participants</Label>
      </Row>
      <Row>
        <Value>80%</Value>
        <Value>1000</Value>
      </Row>
      <Percentage number={10} className={percentage} mainClassName={mainPercentage} precentClassName={percent} />
      <Button className={button}>+ Add funds</Button>
      <FundsLabel>Your funds: 3% / 0.5 eth</FundsLabel>
      <Hr className={hr}/>
      <UsersTitle>user party name</UsersTitle>
      <UserBadge name="user" number={1000} textClassName={userText} />
      <UserBadge name="user" number={1000} textClassName={userText} />
      <UserBadge name="user" number={1000} textClassName={userText} />
    </>
  );
};

export default CrowdTab;
