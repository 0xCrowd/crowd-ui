import React, { PropsWithChildren, ReactElement, memo } from 'react';

//#region
import { styled } from '@linaria/react';

const Root = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  margin-top: 18px;
  margin-bottom: 18px;
  color: #6C5CE7;
`;
//#endregion

interface Props {
  className?: string;
}

const Title = ({ children, className }: PropsWithChildren<Props>): ReactElement => {
  return (
    <Root className={className}>
      {children}
    </Root>
  )
}

export default memo(Title);
