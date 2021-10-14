import React from 'react';

//#region styles
import { styled } from '@linaria/react';
import eth from '@app/assets/images/eth.svg';
import { SearchInput } from '../search-input';

const Root = styled.div`
  height: 69px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 71px;
  background: linear-gradient(90deg, #FF1EAD 0%, #B829FF 37.5%, #3FBFFF 63.54%, #FF09A5 92.71%, #FF09A5 100%);
`;

const Logo = styled.p`
  margin: 0;
  margin-right: 64px;
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
//#endregion

const Navbar = () => {
  return (
    <Root>
      <Row>
        <Logo>CROWD PROTCOL</Logo>
        <SearchInput />
      </Row>
      <PriceBlock>
        <Price>1000</Price>
        <img src={eth} alt="eth" />
      </PriceBlock>
    </Root>
  )
}

export default Navbar
