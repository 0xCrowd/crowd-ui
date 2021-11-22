import React, { ReactElement, useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

import Percentage from "@app/components/percentage";
import Button from "@app/components/button";

import { round } from "@app/utils/round";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { mb12 } from "@app/assets/styles/constants";

import greenGlass from "@assets/images/green_glass.png";
import pinkGlass from "@assets/images/pink_glass.png";
import emeraldGlass from "@assets/images/emerald_glass.png";

import eth from "@app/assets/images/eth_gr_wh.png";

const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 364px;
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  border-radius: 20px;
`;

interface PreviewProps {
  backgroundUrl: string;
}

const PreviewContainer = styled.div`
  position: relative;
  height: 210px;
  border-radius: 20px 20px 0 0;
`;

const PreviewImg = styled.img`
  height: 210px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px 20px 0 0;
  z-index: 98;
`;

const PreviewLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Preview = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(38, 50, 56, 0.3) 0%,
    rgba(38, 50, 56, 0) 100%
  );
  filter: drop-shadow(0px 0px 10px rgba(38, 50, 56, 0.06));
  border-radius: 20px;
  z-index: 100;
`;

const InfoBlockWrapper = styled.div`
  height: 156px;
  position: relative;
  background-size: cover;
  border-radius: 0px 0px 20px 20px;
`;

const StatusBar = styled.div`
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #263238;
  text-transform: uppercase;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03) -13.74%,
    rgba(0, 0, 0, 0.03) 110.26%
  );
`;

const InfoBlock = styled.div<PreviewProps>`
  height: 156px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 24px 13px 24px;
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  border-radius: 0px 0px 20px 20px;
  background-image: ${({ backgroundUrl }) => `url(${backgroundUrl})`};
  z-index: 1000;
  background-size: cover;
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
  color: #ffffff;
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
  color: #ffffff;
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
  color: #9095b4;
  margin: 0;
  font-family: Inter;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #ffffff;
`;

const CollectedValue = styled(CollectedText)`
  font-size: 14px;
  line-height: 18px;
`;

const IconContainer = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 6px;
`;

const Name = styled.p`
  margin: 0;
  padding-top: 18px;
  font-family: Inter;
  font-weight: 800;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #ffffff;
  text-shadow: 0px 0px 12px rgba(38, 50, 56, 0.23);
  text-align: center;
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
  percentage: number;
  price: number;
  image?: string;
  participants: number;
  className?: string;
  isBought?: boolean;
}

const NftCard = ({
  id,
  title,
  image = "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png",
  price,
  percentage = 0,
  participants = 0,
  isBought,
  className,
}: Props): ReactElement => {
  const { push } = useHistory();

  const imgEl = useRef<HTMLImageElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [adaptedPercentage, setAdaptedPercentage] = useState<number | null>(null);
  const [background, setBackground] = useState(greenGlass);
  const [adaptedPrice, setAdaptedPrice] = useState<number | string>("");
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onImageLoaded);
      return () => imgElCurrent.removeEventListener("load", onImageLoaded);
    }
  }, []);

  useEffect(() => {
    if (isBought) {
      setAdaptedPercentage(null);
      setBackground(emeraldGlass);
      setAdaptedPrice('???');
      setStatusText("successful buyout");
    } else if (price === undefined && !isBought) {
      setAdaptedPercentage(null);
      setBackground(pinkGlass);
      setAdaptedPrice("???");
      setStatusText("lost");
    } else {
      setAdaptedPercentage(round(percentage, 1));
      setBackground(greenGlass);
      setAdaptedPrice(price);
      setStatusText("in progress");
    }
  }, [price, isBought]);

  const onImageLoaded = () => setLoaded(true);

  return (
    <Root className={className}>
      <PreviewContainer>
        {!loaded && (
          <PreviewLoading>
            <Loader
              type="Puff"
              color="#6200E8"
              height={20}
              width={20}
              timeout={0}
            />
          </PreviewLoading>
        )}
        <Preview>
          <Name>{title}</Name>
        </Preview>
        <PreviewImg src={image} alt="img" ref={imgEl} />
      </PreviewContainer>
      <InfoBlockWrapper>
        <InfoBlock backgroundUrl={background}>
          <StatusBar>{statusText}</StatusBar>
          <>
            <CollectedBlock>
              <CollectedRow>
                <CollectedText>Collected</CollectedText>
                <CollectedText>Participants</CollectedText>
              </CollectedRow>
              <CollectedRow>
                <CollectedValue>{adaptedPercentage !== null ? `${adaptedPercentage}%` : '???'}</CollectedValue>
                <CollectedValue>{participants}</CollectedValue>
              </CollectedRow>
            </CollectedBlock>
            <Percentage number={adaptedPercentage || 0} className={mb12} />
          </>
          {percentage === 100 && !isBought && (
            <Loader type="Puff" color="#6200E8" height={100} width={100} />
          )}
          <Footer>
            <PriceBlock>
              <PriceTitle>CURRENT PRICE</PriceTitle>
              <PriceRow>
                <IconContainer src={eth} alt="eth" />
                <Price>{adaptedPrice}</Price>
              </PriceRow>
            </PriceBlock>
            <Button
              onClick={() => push(`/${id}`)}
              className={button}
              containerClassName={container}
            >
              VIEW PARTY
            </Button>
          </Footer>
        </InfoBlock>
      </InfoBlockWrapper>
    </Root>
  );
};

export default NftCard;
