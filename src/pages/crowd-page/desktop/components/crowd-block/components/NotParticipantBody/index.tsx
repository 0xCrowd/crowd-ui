import React, { FC } from "react";

//#region styled
import { InfoText } from "../../commonStyles";
import { mb28 } from "@assets/styles/atomic";
import PriceBock, { PriceBlockEnum } from "../PriceBlock";

//#endregion

type Props = {
  votingType:
    | "noVoting"
    | "votingLive"
    | "passed"
    | "notPassed"
    | "youFor"
    | "youAgainst";
  listingPrice: number;
};
const NotParticipantBody: FC<Props> = ({ votingType, listingPrice }) => {

  const renderText = () => {
    switch (votingType) {
      case 'votingLive':
      case 'youAgainst':
      case 'youFor':
        return 'The NFT was listed for the resale by voting 🤑'

      case 'passed':
      case 'notPassed':
        'Resale proposal did not pass'

      default:
        return 'NFT was successfully purchased 🎉';
    }
  }
  return (
    <>
      {votingType === 'passed' && <PriceBock type={PriceBlockEnum.success} price={listingPrice} className={mb28} />}
      <InfoText className={mb28}>{renderText()}</InfoText>
    </>
  );
};

export default NotParticipantBody;
