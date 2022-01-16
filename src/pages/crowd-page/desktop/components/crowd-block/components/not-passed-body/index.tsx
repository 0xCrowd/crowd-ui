import React, { FC } from "react";

import { Row } from "@components/row/Row";

//#region styled
import { PrimaryText, SecondaryText, InfoText } from "../../commonStyles";
import { mb28, mr4 } from "@assets/styles/atomic";

//#endregion

type Props = {
  sum: number | string;
};
const NotPassedBody: FC<Props> = ({ sum }) => {
  return (
    <>
      <InfoText className={mb28}>Resale proposal did not pass</InfoText>
      <Row className={mb28}>
        <SecondaryText className={mr4}>Your funds:</SecondaryText>
        <PrimaryText className={mr4}>{sum}</PrimaryText>
        <SecondaryText className={mr4}>ETH</SecondaryText>
      </Row>
    </>
  );
};

export default NotPassedBody;
