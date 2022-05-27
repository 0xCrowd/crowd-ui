import React, { ReactElement } from "react";
import { cx } from "@linaria/core";
import SkeletonLoader from "tiny-skeleton-loader-react";

import PriceBock, { PriceBlockEnum } from "../components/price-block";
import { Row } from "@app/components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";

//#region styles
import { mr4, mb28, mb12, w100 } from "@assets/styles/atomic";
import { PrimaryText, SecondaryText } from ".././commonStyles";

//#endregion

interface Props {
  price: number;
  resoldPrice: number;
  onWithdraw?: () => void;
  myFound?: number;
  loading: boolean;
}

const ResoldCrowd = ({
  price = 0,
  resoldPrice = 0,
  myFound,
  loading,
  onWithdraw
}: Props): ReactElement => {
  return (
    <>
      <PriceBock type={PriceBlockEnum.bought} price={price} className={mb28} />
      {loading ? (
        <SkeletonLoader
          width={126}
          height={44}
          background="linear-gradient(0deg,#263238,#263238)"
          style={{ marginBottom: '28px' }}
        />
      ) : (
        <PriceBock
          type={PriceBlockEnum.resold}
          price={resoldPrice}
          className={mb28}
        />
      )}
      {myFound && (
        <>
          <SecondaryText className={mb12}>
            This NFT was resold, now you can withdraw funds
          </SecondaryText>
          <GradientBorderButton
            className={cx(mb12, w100)}
            onClick={onWithdraw}
          >
            - Withdraw funds
          </GradientBorderButton>
          <Row className={mb28}>
            <SecondaryText className={mr4}>
              Your funds after resale:
            </SecondaryText>
            <PrimaryText className={mr4}>{myFound}</PrimaryText>
            <SecondaryText>ETH</SecondaryText>
          </Row>
        </>
      )}
    </>
  );
};

export default ResoldCrowd;
