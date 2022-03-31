import React from 'react';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { pink } from '@app/assets/styles/constants';

const Root = styled.div`
  background: linear-gradient(180deg, #28333A 27.08%, rgba(40, 51, 58, 0) 100%);
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 266px;
  margin: auto;
  margin-top: 75px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 24px;
`;

const purpureText = css`
  color: ${pink};
`;
//#endregion

export const LogoBlock = () => {
  return (
    <Root>
      <MainBlock>
        <Text>Own and Manage <span className={purpureText}>NFTs</span> in Partnership</Text>
      </MainBlock>
    </Root>
  )
};
