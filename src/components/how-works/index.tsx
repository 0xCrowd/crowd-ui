import React, { ReactElement } from "react";

import { Row } from "@components/row/Row";

//#region styles
import { styled } from "@linaria/react";

import { textGray, textPrimary } from "@app/assets/styles/constants";

type RootProps = {
  collapsed: boolean;
};

const Root = styled.div<RootProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 416px;
  height: ${({ collapsed }) => (collapsed ? "48px" : "338px")};
  padding-left: 25px;
  background: ${({ collapsed }) =>
    collapsed ? "linear-gradient(0deg, #202527, #202527), #263238" : "#475C67"};
  box-shadow: 0px 1px 2px #40525B;
  border-radius: 5px;
`;

const RootRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 100%;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: ${textPrimary};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  margin-right: 16px;
  font-weight: 800;
  font-size: 18px;
  color: ${textPrimary};
  background: linear-gradient(158.63deg, #00f0ff 4.48%, #ff1cf7 85.94%);
  border-radius: 50%;
`;

const StyledOl = styled.ol`
  width: 340px;
  margin-top: 10px;
  padding-left: 25px;
  font-size: 12px;
  font-weight: 500;
  color: ${textGray};
  line-height: 18px;
`;

const Arrow = styled.div`
  width: 5px;
  height: 5px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  margin-right: 19px;
  transform: rotate(135deg);
  cursor: pointer;
`;

const ReversedArrow = styled.div`
  width: 5px;
  height: 5px;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  transform: rotate(-45deg);
  cursor: pointer;
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  border-radius: 50%;
  background: linear-gradient(
    0deg,
    rgba(197, 220, 250, 0.5),
    rgba(197, 220, 250, 0.5)
  );
`;
//#endregion

interface Props {
  collapsed: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const HowWorks = ({ collapsed, onChange, className }: Props): ReactElement => {
  return (
    <Root collapsed={collapsed} onClick={() => onChange(!collapsed)}>
      <RootRow className={className}>
        <Row>
          <Icon>?</Icon>
          <Title>How it works?</Title>
        </Row>
        {collapsed ? (
          <Arrow />
        ) : (
          <ArrowButton>
            <ReversedArrow />
          </ArrowButton>
        )}
      </RootRow>
      {!collapsed && (
        <>
          <StyledOl>
            <li>
              Automatic NFT buyout happens after the requirement funds are
              collected
            </li>
            <li>
              Each collector receives a stake in NFT proportional to the amount
              of his/her ETH used to purchase this NFT
            </li>
            <li>
              If the Crowd does not succeed in purchasing the NFT, or if any of
              your ETH is not used in the purchase, or if you don’t want to
              participate in this Crowd anymore you are able to withdraw all
              unused funds from your contribution
            </li>
            <li>
              After a successful buyout, any collector can start a Voting for
              the NFT Resale
            </li>
            <li>
              The Resale price is set as the weighted average of all collectors’
              votes
            </li>
            <li>
              After the Resale of NFT, all collectors receive income in
              proportion to their stakes
            </li>
          </StyledOl>
        </>
      )}
    </Root>
  );
};

export default HowWorks;
