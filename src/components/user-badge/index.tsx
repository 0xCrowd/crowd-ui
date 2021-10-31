import React, { FC, memo } from 'react';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NameBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const Name = styled.p`
  margin: 0;
  font-family: Inter;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #263238;
`;

const Avatar = styled.div`
  height: 12px;
  width: 12px;
  margin-right: 6px;
  border-radius: 50%;
  background: #000;
`;

const Price = styled.p`
  margin: 0;
  font-family: Inter;
  font-weight: bold;
  font-size: 10px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #000000;
`;
//#endregion

type PropsType = {
  name: string;
  number?: number;
  className?: string;
  textClassName?: string;
  substrParam?: number
}

const UserBadge: FC<PropsType> = ({ 
  name,
  number,
  substrParam = 5,
  textClassName,
  className,
}) => {
  return (
    <Root className={className}>
      <NameBlock>
        <Avatar />
        <Name className={textClassName}>{`${name.substr(0, substrParam)}...`}</Name>
      </NameBlock>
      {number && <Price className={textClassName}>{number} BNB</Price>}
    </Root>
  )
}

export default memo(UserBadge);
