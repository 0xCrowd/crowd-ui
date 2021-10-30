import React from "react";

//#region styles
import { styled } from "@linaria/react";
import { css } from '@linaria/core';
import Percentage from "@app/components/percentage";
import Button from "@app/components/button";
import { Hr } from "@app/components/hr";


const ProposalInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 36px 0;
`;

const ProposalTitle = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
  font-family: Inter;
  font-weight: 800;
  font-size: 18px;
  line-height: 20px;
  color: #fff;
`;

const ProposalDescription = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
`;

const VoteTitle = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
  font-family: Inter;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Label = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
`;

const Value = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 800;
  font-size: 10px;
  line-height: 18px;
  color: #fff;
`;

const ButtonRow = styled(Row)`
  margin-bottom: 36px;
  margin-top: 8px;
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
  border-radius: 10px;
  box-shadow: none;
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

const MobileProposal = () => {
  return (
    <>
      <ProposalInfo>
        <ProposalTitle>asdasdasdasdasd</ProposalTitle>
        <ProposalDescription>asd asdasd asdasda asdasdas asdasd asdasd asdas</ProposalDescription>
      </ProposalInfo>
      <VoteTitle>Vote</VoteTitle>
      <Row>
        <Label>For</Label>
        <Label>Against</Label>
      </Row>
      <Percentage number={10} className={percentage} mainClassName={main} precentClassName={percent}/>
      <Row>
        <Value>3%</Value>
        <Value>3%</Value>
      </Row>
      <ButtonRow>
        <Button className={button} containerClassName={buttonContainer}>Vote FOR</Button>
        <Button className={button} containerClassName={buttonContainer}>Vote AGAINST</Button>
      </ButtonRow>
      <Hr />
    </>
  );
};

export default MobileProposal;
