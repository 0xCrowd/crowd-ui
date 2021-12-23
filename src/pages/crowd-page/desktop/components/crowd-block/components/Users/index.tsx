import React, { FC } from 'react';
import Scrollbars from "react-custom-scrollbars";

import { Hr } from '@app/components/hr';
import UserBadge from '@app/components/user-badge';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { mb4 } from '@assets/styles/atomic';
import { textPrimary } from '@app/assets/styles/constants';

const UserTitle = styled.p`
  margin: 0; 
  font-weight: 700;
  font-size: 14px;
  line-height: 32px;
  color: ${textPrimary};
`;

const scroller = css`
  height: 60px !important;
`;

const hr = css`
  margin: 0;
`;

const text = css`
  color: #9095B4;
`;
//#endregion

type Props = {
  participants: IDeposits[];
}

const Users: FC<Props> = ({ participants }) => {
  return (
    <>
      <Hr className={hr}/>
      <UserTitle>Participants: {participants?.length || 0}</UserTitle>
      <Scrollbars className={scroller}>
        {participants?.length > 0 &&
          participants.map(({ address, total_deposit }) => {
            return (
              <UserBadge
                key={address}
                number={total_deposit}
                name={address}
                className={mb4}
                textClassName={text}
              />
            );
          })}
      </Scrollbars>
    </>
  );
};

export default Users;
