import React, { ReactElement } from "react";

import PriceBock, { PriceBlockEnum } from ".././components/PriceBlock";
import NotParticipantBody from "../components/NotParticipantBody";
import ParticipantBody from "../components/ParticipantBody";
import ParticipantLeftovBody from "../components/ParticipantLeftovBody";
import PassedBody from "../components/PassedBody/index";
import PassedLeftovBody from "../components/PassedLeftovBody";
import NotPassedBody from "../components/NotPassedBody";
import NotPassedLeftovBody from "../components/NotPassedLeftovBody";

//#region styles
import { mb28 } from "@assets/styles/atomic";

//#endregion

interface Props {
  votingType: VotingType | 'notVoting'
  price: string | number;
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
}: Props): ReactElement => {
  const isLeftovers = !!leftovers;

  const renderBody = () => {
    switch (votingType) {
      case "success":
        if (isLeftovers) {
          return (
            <PassedBody
              sum={myFound as number}
              afterSum={afterFounds as number}
              listingPrice={listingPrice as number}
            />
          );
        }
        return (
          <PassedLeftovBody
            sum={myFound as number}
            afterSum={afterFounds as number}
            listingPrice={listingPrice as number}
            leftovers={leftovers as number}
          />
        );

      case "noSuccess":
        if (isLeftovers) {
          return (
            <NotPassedBody
              sum={myFound as number}
            />
          );
        }
        return (
          <NotPassedLeftovBody
            sum={myFound as number}
            leftovers={leftovers as number}
          />
        );

      default:
        if (isLeftovers) {
          return (
            <ParticipantBody
              sum={myFound as number}
            />
          );
        }
        return (
          <ParticipantLeftovBody
            sum={myFound as number}
            leftovers={leftovers as number}
          />
        );
    }
  };

  return (
    <>
      <PriceBock type={PriceBlockEnum.primary} price={price} className={mb28} />
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