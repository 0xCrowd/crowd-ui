import React, { FC } from "react";

import { Row } from "@components/row/Row";

//#region styled
import { PrimaryText, SecondaryText, InfoText } from '../../commonStyles';
import { mb28, mr4, mb12 } from "@assets/styles/atomic";

//#endregion

type Props = {
  sum: number | string;
  percent: number;
};
const ParticipantBody: FC<Props> = ({ sum, percent }) => {
  return (
    <>
      <InfoText
        className={mb12}
      >
        NFT was successfully purchased 🎉
      </InfoText>
      <SecondaryText className={mb28}>
        Now you can vote for the resale price. If the vote is passed, the NFT
        will be listed for the resale
      </SecondaryText>
      <Row className={mb28}>
        <SecondaryText className={mr4}>Your funds:</SecondaryText>
        <PrimaryText className={mr4}>
          {percent}% / {sum}
        </PrimaryText>
        <SecondaryText className={mr4}>ETH</SecondaryText>
      </Row>
    </>
  );
};

export default ParticipantBody;
