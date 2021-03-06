import React from 'react';

//#region styles
import { styled } from '@linaria/react';

import search from '@assets/images/Search.svg';

const Root = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 432px;
  height: 32px;
  padding-left: 10px;
  background: rgba(92, 118, 132, 0.39);
  border-radius: 8px;
  border: none;
  outline: none;
  color: #fff;
`;

const Icon = styled.img`
  position: absolute;
  top: 8px;
  right: 33px;
`;
//#endregion

const SearchInput = () => {
  return (
    <Root>
      <StyledInput />
      <Icon src={search} />
    </Root>
  );
};

export default SearchInput;