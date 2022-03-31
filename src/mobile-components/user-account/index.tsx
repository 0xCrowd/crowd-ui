import React from 'react';

//#region styles
import { styled } from '@linaria/react';

import { textPrimary } from '@app/assets/styles/constants';

import avatar from '@assets/images/avatar.png';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  background: linear-gradient(94.13deg, #00F0FF -27.4%, #FF1CF7 95.95%);
  border-radius: 10px;
`;

const Text = styled.div`
  margin-right: 6px;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  color: ${textPrimary};
`;

const Avatar = styled.img`
  width: 14px;
  height: 14px
  border-radius: 50%;
`;
//#endregion

type Props = {
  text: string;
}

export const UserAccount = ({ text }: Props) => {
  const formattedText = text ? `${text.substr(0, 6)}...${text.substr(text.length - 4), text.length}` : 'connect';

  return (
    <Root>
      <Text title={text} >{formattedText}</Text>
      <Avatar src={avatar} />
    </Root>
  )
};
