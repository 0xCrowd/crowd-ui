import React, { ReactElement } from 'react';

import SearchInput from '@components/search-input';

//#region styles
import { styled } from '@linaria/react';

import eth from '@app/assets/images/bnb.png';
import logo from '@assets/images/logo.png';


const Root = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 23px;
  padding-right: 71px;
  background: #263238;
`;

const Logo = styled.img`
  margin-right: 12px;
  width: 54px;
  height: 44px;
  cursor: pointer;
`;

const LogoText = styled.a`
  margin: 0;
  margin-right: 64px;
  font-family: 'Alata', sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #FFFFFF;
  outline: none;
  text-decoration: none;
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
  className?: string;
}

const Navbar = ({ balance, className }: Props): ReactElement => {
  return (
    <Root className={className}>
      <Row>
        <a href="/">
          <Logo src={logo} alt="logo" />
        </a>
        <LogoText href="/">Crowd protocol</LogoText>
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
