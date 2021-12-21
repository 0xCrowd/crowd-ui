import React, { ReactElement, useEffect, useState } from "react";
import { cx } from "@linaria/core";

import PercentBar from "@app/components/percent-bar";
import PriceBock, { PriceBlockEnum } from ".././components/PriceBlock";
import { Row } from "@app/components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";
import ActiveDescription from ".././components/ActiveDescription";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { mb18, mr4, mb2, mb28, mb12, w100 } from "@assets/styles/atomic";
import { blueText, successText } from "@app/assets/styles/constants";
import { InfoText, PrimaryText, SecondaryText } from ".././commonStyles";
import NotParticipantBody from "../components/NotParticipantBody";
import ParticipantBody from "../components/ParticipantBody";
import ParticipantLeftovBody from "../components/ParticipantLeftovBody";
import PassedBody from "../components/PassedBody/index";
import PassedLeftovBody from "../components/PassedLeftovBody";
import NotPassedBody from "../components/NotPassedBody";
import NotPassedLeftovBody from "../components/NotPassedLeftovBody";

const GreenNumber = styled.p`
  margin: 0;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${successText};
`;

const BlueNumber = styled.p`
  margin: 0;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${blueText};
`;

const PriceRow = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;

const priceRowContainer = css`
  align-items: flex-end;
`;
//#endregion

interface Props {
  votingType:
    | "noVoting"
    | "votingLive"
    | "passed"
    | "notPassed"
    | "youFor"
    | "youAgainst";
  collected: number;
  percentage: number;
  price: string | number;
  onWithdraw?: () => void;
  isParticipant?: boolean;
  isLeftovers?: boolean;
  listingPrice?: number;
  yourFound?: number;
  yourPercent?: number;
  afterFounds?: number;
  leftovers?: number;
}

const SuccessCrowd = ({
  votingType,
  collected,
  percentage,
  price,
  isParticipant,
  isLeftovers,
  listingPrice,
  yourFound,
  yourPercent,
  afterFounds,
  leftovers,
}: Props): ReactElement => {
  const renderBody = () => {
    switch (votingType) {
      case "passed":
        if (isLeftovers) {
          return (
            <PassedBody
              sum={yourFound as number}
              percent={yourPercent as number}
              afterSum={afterFounds as number}
              listingPrice={listingPrice as number}
            />
          );
        }
        return (
          <PassedLeftovBody
            sum={yourFound as number}
            percent={yourPercent as number}
            afterSum={afterFounds as number}
            listingPrice={listingPrice as number}
            leftovers={leftovers as number}
          />
        );

      case "notPassed":
        if (isLeftovers) {
          return (
            <NotPassedBody
              sum={yourFound as number}
              percent={yourPercent as number}
            />
          );
        }
        return (
          <NotPassedLeftovBody
            sum={yourFound as number}
            percent={yourPercent as number}
            leftovers={leftovers as number}
          />
        );

      default:
        if (isLeftovers) {
          return (
            <ParticipantBody
              sum={yourFound as number}
              percent={yourPercent as number}
            />
          );
        }
        return (
          <ParticipantLeftovBody
            sum={yourFound as number}
            percent={yourPercent as number}
            leftovers={leftovers as number}
          />
        );
    }
  };

  return (
    <>
      <PriceBock type={PriceBlockEnum.primary} price={price} className={mb28} />
      {!isParticipant ? (
        <NotParticipantBody
          votingType={votingType}
          listingPrice={listingPrice as number}
        />
      ) : (
        renderBody()
      )}
    </>
  );
};

export default SuccessCrowd;
