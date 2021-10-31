import React, { ReactElement } from 'react';
import { Scrollbars } from "react-custom-scrollbars";
import Loader from 'react-loader-spinner';

import Button from '@app/components/button';
import Title from '@app/components/title';
import UserBadge from '@app/components/user-badge';
import RaribleButton from '@app/components/rarible-button/index';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import share from '@assets/images/share.svg';
import eth from '@assets/images/bnb.png';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 814px;
`;

interface BackgroundProps {
  background: string;
}

const Background = styled.div<BackgroundProps>`
  flex-shrink: 0;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  height: 520px;
  width: 100%;
`;

const BackgroundBlur = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0px 8px 16px rgba(45, 52, 54, 0.16);
  backdrop-filter: blur(10px);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 46px 48px 28px 48px;
  background-color: #fff;
`;

const NftBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const NftName = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #263238;
`;

const DescriptionTitle = styled.p`
  margin: 0;
  margin-bottom: 8px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #263238;
`;

const Description = styled.p`
  margin: 0;
  margin-bottom: 22px;
  font-family: Inter;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #263238;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceLabel = styled.div`
  margin: 0;
  margin-bottom: 8px;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #263238;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 8px;
  border-radius: 50%;
`;

const Price = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #263238;
`;

const Preview = styled.img`
  position: absolute;
  top: 80px;
  right: 48px;
  height: 460px;
  width: 304px;
  border-radius: 40px;
  z-index: 100;
`;

const Header = styled.div`
  margin: 0;
  position: absolute;
  top: 28px;
  left: 50%;
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  transform: translate(-50%, -50%);
  text-shadow: 0px 0px 8px rgba(38, 50, 56, 0.5);
  z-index: 100;
`;

const title = css`
  position: absolute;
  top: 52px;
  margin: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 100;
  text-shadow: 0px 0px 8px rgb(38 50 56 / 50%);
`;

const badge = css`
  margin-bottom: 22px;
`;

const ShareIcon = styled.img`
  margin-right: 12px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const scroll = css`
  @media (max-height: 800px) {
    height: 650px
  }
`;
//#endregion

interface Props {
  nftName: string;
  image: string;
  partyName: string;
  description: string;
  price: number;
  userName: string;
  nftId: string;
  loading: boolean;
  onSubmit: () => void;
}

const NftPreview = ({ 
  nftName,
  userName,
  partyName,
  description,
  price,
  image,
  nftId,
  loading,
  onSubmit,
}: Props): ReactElement => {
  return (
    <Scrollbars className={scroll}>
      <Root>
        <Header>Start a PARTY</Header>
        <Title className={title}>{partyName}</Title>
        <Preview src={image} alt="preview" />
        <Background background={image}>
          <BackgroundBlur />
        </Background>
        <Info>
          <NftBlock>
            <NftName>{nftName}</NftName>
            <Icons>
              <ShareIcon src={share} alt="share"/>
              <RaribleButton href={`https://rarible.com/token/${nftId}`}/>
            </Icons>
          </NftBlock>
          <UserBadge className={badge} name={userName}/>
          <DescriptionTitle>Description</DescriptionTitle>
          <Description>{description}</Description>
          <Footer>
            <PriceBlock>
              <PriceLabel>CURRENT PRICE</PriceLabel>
              <PriceRow>
                <Icon src={eth}/>
                <Price>{price}</Price>
              </PriceRow>
            </PriceBlock>
            <Button onClick={onSubmit}>
            {loading ? (
              <Loader
                type="Puff"
                color="#6200E8"
                height={20}
                width={20}
                timeout={3000}
              />
              )  : 'Start Crowd'}
            </Button>
          </Footer>
        </Info>
      </Root>
    </Scrollbars>
  )
}

export default NftPreview
