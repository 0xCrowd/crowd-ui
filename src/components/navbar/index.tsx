import React, { ReactElement } from 'react';

import SearchInput from '@components/search-input';

//#region styles
import { styled } from '@linaria/react';

import eth from '@app/assets/images/eth_wh.png';
import logo from '@assets/images/logo.png';


const Root = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 23px;
  padding-right: 71px;
  background: linear-gradient(0deg, rgba(63, 155, 215, 0.12), rgba(63, 155, 215, 0.12)), linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(0deg, #000000, #000000);
`;

const Logo = styled.img`
  margin-right: 12px;
`;

const LogoText = styled.p`
  margin: 0;
  margin-right: 64px;
  font-family: 'Alata', sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #FFFFFF;
`;

const PriceBlock = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.p`
  margin: 0;
  margin-right: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #FFFFFF;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;
//#endregion

interface Props {
  balance: string;
}

const Navbar = ({ balance }: Props): ReactElement => {
  return (
    <Root>
      <Row>
        <Logo src={logo} alt="logo" />
        <LogoText>Crowd protocol</LogoText>
        <SearchInput />
      </Row>
      <PriceBlock>
        <Price>{balance}</Price>
        <Icon src={eth} alt="eth" />
      </PriceBlock>
    </Root>
  )
}

export default Navbar
