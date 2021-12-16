import React, { FC } from 'react';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  background-color: #2A3840;
`;

const Percent = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #C8FF2A;
`;
//#endregion

type Props = {
  percent: number;
  className?: string;
}

const PercentBar: FC<Props> = ({ percent, className }) => {
  return (
    <Root className={className}>
      <Percent style={{ width: percent }} />
    </Root>
  )
}

export default PercentBar;