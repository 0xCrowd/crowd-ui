import React, { FC } from "react";

//#region styled
import { InfoText } from "../../commonStyles";
import { mb28 } from "@assets/styles/atomic";
import PriceBock, { PriceBlockEnum } from "../price-block";

//#endregion

type Props = {
  votingType: VotingType | 'notVoting';
  listingPrice: number;
};
const NotParticipantBody: FC<Props> = ({ votingType, listingPrice }) => {

  const renderText = () => {
    switch (votingType) {
      case 'liveNotVote':
      case 'liveVoteAgainst':
      case 'liveVoteFor':
        return 'The NFT was listed for the resale by voting 🤑'

      case 'success':
      case 'noSuccess':
        'Resale proposal did not pass'

      default:
        return 'NFT was successfully purchased 🎉';
    }
  }
  return (
    <>
      {votingType === 'success' && <PriceBock type={PriceBlockEnum.success} price={listingPrice} className={mb28} />}
      <InfoText className={mb28}>{renderText()}</InfoText>
    </>
  );
};

export default NotParticipantBody;
