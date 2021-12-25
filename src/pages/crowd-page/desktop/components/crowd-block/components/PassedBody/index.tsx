import React, { FC } from "react";

import { Row } from '@components/row/Row';

//#region styled
import { PrimaryText, SecondaryText, InfoText } from '../../commonStyles';
import { mb28, mr4, mb2 } from '@assets/styles/atomic';
import PriceBock, { PriceBlockEnum } from "../PriceBlock";

//#endregion

type Props = {
  sum: number | string;
  afterSum: number;
  listingPrice: number;
}
const PassedBody: FC<Props> = ({
  sum,
  afterSum,
  listingPrice
}) => {
  return (
    <>
      <PriceBock type={PriceBlockEnum.success} price={listingPrice} className={mb28} />
      <InfoText className={mb28}>The NFT was listed for the resale by voting 🤑</InfoText>
      <Row className={mb2}> 
        <SecondaryText className={mr4}>
          Your funds:
        </SecondaryText>
        <PrimaryText className={mr4}>{sum}</PrimaryText>
        <SecondaryText className={mr4}>
          ETH
        </SecondaryText>
      </Row>
      <Row className={mb28}> 
        <SecondaryText className={mr4}>
          Your funds after resale:
        </SecondaryText>
        <PrimaryText className={mr4}>{afterSum}</PrimaryText>
        <SecondaryText className={mr4}>
          ETH
        </SecondaryText>
      </Row>
    </>
  );
};

export default PassedBody;
