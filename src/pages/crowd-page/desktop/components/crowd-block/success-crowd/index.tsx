import React, { ReactElement } from "react";

import PriceBock, { PriceBlockEnum } from "../components/price-block";
import NotParticipantBody from "../components/not-participant-body";
import ParticipantBody from "../components/participant-body";
import ParticipantLeftovBody from "../components/participant-leftov-body";
import PassedBody from "../components/passed-body/index";
import PassedLeftovBody from "../components/passed-leftov-body";
import NotPassedBody from "../components/not-passed-body";
import NotPassedLeftovBody from "../components/not-passed-leftov-body";

//#region styles
import { mb28 } from "@assets/styles/atomic";

//#endregion

interface Props {
  votingType: VotingType | "notVoting";
  price: number;
  onWithdraw?: () => void;
  listingPrice?: number;
  myFound?: number;
  afterFounds?: number;
  leftovers?: number;
}

const SuccessCrowd = ({
  votingType,
  price,
  listingPrice,
  myFound,
  afterFounds,
  leftovers,
  onWithdraw
}: Props): ReactElement => {
  const isLeftovers = !!leftovers;

  const renderBody = () => {
    switch (votingType) {
      case "success":
        if (isLeftovers) {
          return (
            <PassedLeftovBody
              sum={myFound as number}
              afterSum={afterFounds as number}
              listingPrice={listingPrice as number}
              leftovers={leftovers as number}
              onWithdraw={onWithdraw}
            />
          );
        }
        return (
          <PassedBody
            sum={myFound as number}
            afterSum={afterFounds as number}
            listingPrice={listingPrice as number}
          />
        );

      case "noSuccess":
        if (isLeftovers) {
          return (
            <NotPassedLeftovBody
              sum={myFound as number}
              leftovers={leftovers as number}
              onWithdraw={onWithdraw}
            />
          );
        }
        return <NotPassedBody sum={myFound as number} />;

      default:
        if (isLeftovers) {
          return (
            <ParticipantLeftovBody
              sum={myFound as number}
              leftovers={leftovers as number}
              onWithdraw={onWithdraw}
            />
          );
        }
        return <ParticipantBody sum={myFound as number} />;
    }
  };

  return (
    <>
      <PriceBock
        type={PriceBlockEnum.primary}
        price={price ?? "N/A"}
        className={mb28}
      />
      {!myFound ? (
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
