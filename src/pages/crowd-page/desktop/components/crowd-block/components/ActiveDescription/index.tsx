import React, { FC } from 'react';

//#region styles
import { styled } from '@linaria/react';

import { InfoText } from '../../commonStyles';
import { mb4 } from '@assets/styles/atomic';
import { textGray } from '@app/assets/styles/constants';

const StyledUl = styled.ul`
  margin-top: 0;
  margin-bottom: 5px;
  padding-left: 25px;
  font-size: 12px;
  line-height: 16px;
`;

const StyledLi = styled.li`
  color: ${textGray};
`;

//#endregion

type Props = {
  className?: string;
}

const ActiveDescription: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <InfoText className={mb4}>Add founds to:</InfoText>
      <StyledUl>
        <StyledLi>Increase your stake in the acquired NFT</StyledLi>
        <StyledLi>Increase the chances of a successful buyout</StyledLi>
      </StyledUl>
    </div>
  )
}

export default ActiveDescription
