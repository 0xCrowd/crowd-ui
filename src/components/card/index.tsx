import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';

import Percentage from '@app/components/percentage';

import { round } from '@app/utils/round';

import eth from '@app/assets/images/eth.svg';

//#region styles
import { styled } from '@linaria/react';
import { mb8, mb12 } from '@app/assets/styles/constants';
import Button from '../button';

interface RootProps {
  backgroundUrl: string;
}

const Root = styled.div<RootProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 380px;
  height: 440px;
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  border-radius: 40px;
  background-image: ${({ backgroundUrl }) => `url(${backgroundUrl})`};
  background-size: cover;
`;

const InfoBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 180px;
  width: 100%;
  padding: 15px 38px;
  background: linear-gradient(0deg, rgba(63, 155, 215, 0.18), rgba(63, 155, 215, 0.18));
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  backdrop-filter: blur(40px);
  border-radius: 0px 0px 40px 40px;
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceTitle = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  margin-bottom: 8px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const CollectedBlock = styled.div`
  margin-bottom: 12px;
`;

const CollectedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CollectedText = styled.p`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.25px;
  color: #9095B4;
  margin: 0;
  font-family: Inter;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const CollectedValue = styled(CollectedText)`
  font-size: 18px;
  line-height: 18px;
`;

const IconContainer = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  margin-right: 14px;
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
  border-radius: 40px 40px 0 0;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Card = ({
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
  console.log("CAAARD");
  console.log(image, 'img')
  return (
    <Root style={{ backgroundImage: image }} backgroundUrl={image} className={className}>
      <Name>
        {title}
      </Name>
      <InfoBlock>
        <CollectedBlock>
          <CollectedRow className={mb8}>
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
          <Button onClick={() => push(`id/${id}`)}>
            VIEW THE PARTY
          </Button>
        </Footer>
      </InfoBlock>
    </Root>
  )
}

export default Card
