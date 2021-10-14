import React, { ReactElement } from 'react';

import Button from '@app/components/button';
import Title from '@app/components/title';
import UserBadge from '@app/components/user-badge';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import share from '@assets/images/share.svg';
import rarible from '@assets/images/rarible.svg';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface BackgroundProps {
  background: string;
}

const Background = styled.div<BackgroundProps>`
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

const Icon = styled.div`
  height: 24px;
  width: 24px;
  margin-right: 8px;
  border-radius: 50%;
  border: 1px solid #000;
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
  height: 480px;
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
//#endregion

interface Props {
  nftName: string;
  image: string;
  partyName: string;
  description: string;
  price: number;
  userName: string;
}

const NftPreview = ({ 
  nftName,
  userName,
  partyName,
  description,
  price,
  image,
}: Props): ReactElement => {
  return (
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
            <img src={rarible} alt="rari"/>
          </Icons>
        </NftBlock>
        <UserBadge className={badge} name={userName}/>
        <DescriptionTitle>Description</DescriptionTitle>
        <Description>{description}</Description>
        <Footer>
          <PriceBlock>
            <PriceLabel>CURRENT PRICE</PriceLabel>
            <PriceRow>
              <Icon />
              <Price>{price}</Price>
            </PriceRow>
          </PriceBlock>
          <Button>View the Party</Button>
        </Footer>
      </Info>
    </Root>
  )
}

export default NftPreview
