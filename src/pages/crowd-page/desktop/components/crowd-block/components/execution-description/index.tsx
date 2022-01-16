import React, { FC } from 'react';

//#region styles
import { mb4 } from '@assets/styles/atomic';
import { InfoText } from '../../commonStyles';
import { StyledLi, StyledUl } from '../active-description';

//#endregion

type Props = {
  className?: string;
}

const ExecutionDescription: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <InfoText className={mb4}>NFT buyout is happening now:</InfoText>
      <StyledUl>
        <StyledLi>It may take a few moments</StyledLi>
      </StyledUl>
    </div>
  )
}

export default ExecutionDescription
