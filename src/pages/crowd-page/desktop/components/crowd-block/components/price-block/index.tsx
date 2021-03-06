import React, { FC, useState, useEffect } from "react";

import { Row } from '@components/row/Row';

//#region styles
import { styled } from "@linaria/react";

import { mr4 } from "@app/assets/styles/atomic";
import { successText, textGray, textPrimary } from "@app/assets/styles/constants";

import eth from '@assets/images/eth_gr.png';

const PriceBlock = styled.div`
  display: flex;
  height: 44px;
  margin-bottom: 28px;
`;

type IconProps = {
  background: string;
}

const Icon = styled.div<IconProps>`
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 12px;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
`;

const PriceRows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceTitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: ${textGray};
`;

const PriceLabel = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${textGray};
`;

const Price = styled.p`
  margin: 0;
  margin-right: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: ${textPrimary};
`;

const SuccessPrice = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;
  color: ${successText};
`;
//#endregion

export enum PriceBlockEnum {
  primary = "primary",
  success = "success",
  bought = 'bought',
  resold = 'resold',
}

type Props = {
  type: PriceBlockEnum;
  price: number;
  className?: string;
};

const PriceBock: FC<Props> = ({ type, price, className }) => {
  const [title, setTitle] = useState('NFT Price');
  const [priceBlock, setPriceBlock] = useState(<Price className={mr4}>{price || 'N/A'}</Price>);

  useEffect(() => {
    switch (type) {
      case PriceBlockEnum.success:
        setTitle("Listing price");
        setPriceBlock(<SuccessPrice className={mr4}>{price || 'N/A'}</SuccessPrice>);
        break;

      case PriceBlockEnum.resold:
        setTitle('Resold for');
        setPriceBlock(<SuccessPrice className={mr4}>{price || 'N/A'}</SuccessPrice>);
        break;

      case PriceBlockEnum.bought:
        setTitle('Bought for');
        setPriceBlock(<Price className={mr4}>{price || 'N/A'}</Price>);
        break;
    }
  }, [type, price]);

  return (
    <PriceBlock className={className}>
      <Icon background={eth} />
      <PriceRows>
        <PriceTitle>
          {title}
        </PriceTitle>
        <Row>
          {priceBlock}
          <PriceLabel>ETH</PriceLabel>
        </Row>
      </PriceRows>
    </PriceBlock>
  );
};

export default PriceBock;
