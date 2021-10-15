import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';

import Percentage from '@app/components/percentage';

import { round } from '@app/utils/round';

import eth from '@app/assets/images/eth.svg';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { mb8, mb12 } from '@app/assets/styles/constants';
import Button from '../button';

const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 440px;
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  border-radius: 20px;
`;

interface PreviewProps {
  backgroundUrl: string;
}

const Preview = styled.div<PreviewProps>`
  height: 264px;
  border-radius: 20px 20px 0 0;
  background-image: ${({ backgroundUrl }) => `url(${backgroundUrl})`};
  background-size: cover;
`;

const InfoBlockWrapper = styled.div<PreviewProps>`
  background-image: ${({ backgroundUrl }) => `url(${backgroundUrl})`};
  background-size: cover;
  border-radius: 0px 0px 20px 20px;
`;

const InfoBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 24px 13px 24px;
  background: linear-gradient(0deg, rgba(63, 155, 215, 0.18), rgba(63, 155, 215, 0.18));
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  backdrop-filter: blur(40px);
  border-radius: 0px 0px 20px 20px;
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceTitle = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  margin-bottom: 3px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const CollectedBlock = styled.div`
  margin-bottom: 8px;
`;

const CollectedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CollectedText = styled.p`
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.25px;
  color: #9095B4;
  margin: 0;
  font-family: Inter;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const CollectedValue = styled(CollectedText)`
  font-size: 14px;
  line-height: 18px;
`;

const IconContainer = styled.div`
  display: flex;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  border-radius: 50%;
  border: 1px solid #6C5CE7;
`;

const Name = styled.p`
  margin: 0;
  padding-top: 18px;
  font-family: Inter;
  font-weight: 800;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  text-shadow: 0px 0px 12px rgba(38, 50, 56, 0.23);
  text-align: center;
  background: linear-gradient(180deg, rgba(38, 50, 56, 0.6) 0%, rgba(38, 50, 56, 0.282) 53.12%, rgba(38, 50, 56, 0) 100%);
  border-radius: 20px 20px 0 0;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const button = css`
  height: 36px;
  width: 96px;
  padding: 12px 10px;
  font-size: 10px;
  line-height: 12px;
`;

const container = css`
  height: 36px;
  width: 96px;
`;
//#endregion

interface Props {
  id: string;
  title: string;
  collected: number;
  price: number;
  image?: string;
  participants: number;
  className?: string;
}

const NftCard = ({
  id,
  title,
  image = "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png",
  price,
  collected = 0,
  participants = 0,
  className 
}: Props): ReactElement => {
  const { push } = useHistory();

  const rounded = round(collected, 1);

  return (
    <Root className={className}>
      <Preview backgroundUrl={image}>
        <Name>
          {title}
        </Name>
      </Preview>
      <InfoBlockWrapper backgroundUrl={image}>
        <InfoBlock>
          <CollectedBlock>
            <CollectedRow>
              <CollectedText>Collected</CollectedText>
              <CollectedText>Participants</CollectedText>
            </CollectedRow>
            <CollectedRow>
              <CollectedValue>{rounded > 100 ? 100 : rounded}%</CollectedValue>
              <CollectedValue>{participants}</CollectedValue>
            </CollectedRow>
          </CollectedBlock>
          <Percentage number={collected} className={mb12}/>
          <Footer>
            <PriceBlock>
              <PriceTitle>CURRENT PRICE</PriceTitle>
              <PriceRow>
                <IconContainer>
                  <img src={eth} alt="eth" />
                </IconContainer>
                <Price>10000</Price>
              </PriceRow>
            </PriceBlock>
            <Button onClick={() => push(`/${id}`)} className={button} containerClassName={container}>
              VIEW PARTY
            </Button>
          </Footer>
        </InfoBlock>
      </InfoBlockWrapper>
    </Root>
  )
}

export default NftCard
