import React, { ReactElement, useRef, useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

import PercentBar from "@components/percent-bar";

//#region styles
import { styled } from "@linaria/react";
import {
  defaultBorderRadius,
  textPrimary,
  textSecondary,
} from "@app/assets/styles/constants";
import { mb12, media } from "@app/assets/styles/atomic";

import eth from "@app/assets/images/eth_wh.png";
import activeCard from "@app/assets/images/card_active.png";
import lostCard from "@app/assets/images/card_lost.png";
import successCard from "@app/assets/images/card_success.png";
import successSellCard from "@app/assets/images/card_success_sell.png";
import { CrowdStatusText } from '../../enums/crowd-status/crowd-status';

type RootProps = {
  background: string;
}

const Root = styled.div<RootProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 400px;
  padding: 12px 24px;
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  background-image: ${({ background }) => `url(${background})`};
  background-size: contain;
  border-radius: ${defaultBorderRadius};
  cursor: pointer;

  ${media('mobile')} {
    background-size: 100% 100%;
    width: 90%;
  }
`;

const Title = styled.div`
  width: 100%;
  line-height: 16px;
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${textPrimary};
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 216px;
`;

const Preview = styled.img`
  max-width: 216px;
  max-height: 216px;
`;

const PreviewLoader = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 216px;
  width: 216px;
  background-color: #212628;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 24px;
  color: ${textPrimary};
`;

const PriceLabel = styled.p`
  margin: 0;
  margin-right: 6px;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
`;

const EthIcon = styled.img`
  height: 18px;
  width: 18px;
  margin-right: 6px;
  border: 1px solid white;
  border-radius: 50%;
`;

const Price = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 18px;
  color: ${textPrimary};
`;

const ParticipantsLabel = styled.p`
  margin: 0;
  font-size: 10px;
  font-weight: 500;
`;

const ParticipantsValue = styled.div`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

const Status = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: ${textSecondary};
  text-transform: uppercase;
  text-align: center;
`;
//#endregion

interface Props {
  id: string;
  title: string;
  percentage: number;
  price: number;
  image?: string;
  participants: number;
  status: CrowdStatusType;
  className?: string;
}

const NftCard = ({
  id,
  title,
  image = "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png",
  price,
  percentage = 0,
  participants = 0,
  status,
  className,
}: Props): ReactElement => {
  const { push } = useHistory();

  const imgEl = useRef<HTMLImageElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [statusText, setStatusText] = useState<CrowdStatusText>(CrowdStatusText.active);
  const [cardBackground, setCardBackground] = useState('');

  const onImageLoaded = () => setLoaded(true);

  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onImageLoaded);
      return () => imgElCurrent.removeEventListener("load", onImageLoaded);
    }
  }, []);

  useEffect(() => {
    switch (status) {
      case "active":
        setCardBackground(activeCard);
        setStatusText(CrowdStatusText.active);
        break;
      
      case "failed":
        setCardBackground(lostCard);
        setStatusText(CrowdStatusText.lost);
        break;
      
      case "complete":
        setCardBackground(successCard);
        setStatusText(CrowdStatusText.success);
        break;

      case "resolved":
        setCardBackground(successSellCard);
        setStatusText(CrowdStatusText.resale);
        break;

      case 'on_execution':
        setCardBackground(activeCard);
        setStatusText(CrowdStatusText.buyout);
        break;

      default:
        setCardBackground(activeCard);
        setStatusText(CrowdStatusText.active);
    }
  }, [status]);

  return (
    <Root className={className} background={cardBackground} onClick={() => push(id)}>
      <Title title={title} className={mb12}>{title || 'XXX'}</Title>
      <PreviewContainer>
        <Preview src={image} alt="preview" className={mb12} ref={imgEl}/>
        {!loaded && <PreviewLoader className={mb12}>
          <Loader
            type="Puff"
            color="#6200E8"
            height={20}
            width={20}
            timeout={0}
          />
        </PreviewLoader>}
      </PreviewContainer>
      <PriceRow className={mb12}>
        <PriceLabel>Price</PriceLabel>
        <EthIcon src={eth}/>
        <Price>{`ETH ${price || 'XXX'}`}</Price>
      </PriceRow>
      <Row>
        <ParticipantsLabel>Collected</ParticipantsLabel>
        <ParticipantsLabel>Participants</ParticipantsLabel>
      </Row>
      <Row className={mb12}>
        <ParticipantsValue>{percentage || 0}%</ParticipantsValue>
        <ParticipantsValue>{participants}</ParticipantsValue>
      </Row>
      <PercentBar percent={percentage || 0} className={mb12}/>
      <Status>{statusText}</Status>
    </Root>
  );
};

export default NftCard;
