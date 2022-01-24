import React, { FC, memo } from "react";

//#region styles
import { styled } from "@linaria/react";
import { textPrimary } from "@app/assets/styles/constants";

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

const Name = styled.a`
  margin: 0;
  font-family: Inter;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #263238;
  text-decoration: none;
  
  &:hover {
    color: ${textPrimary};
  }
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
};

const UserBadge: FC<PropsType> = ({
  name,
  number,
  textClassName,
  className,
}) => {
  const firstPart = name.substr(0, 4);
  const secondPart = name.substr(name.length - 4, name.length);
  return (
    <Root className={className}>
      <NameBlock>
        <Avatar />
        <Name
          title={name}
          href={`https://rinkeby.etherscan.io/address/${name}`}
          target="_blank"
          className={textClassName}
        >{`${firstPart}...${secondPart}`}</Name>
      </NameBlock>
      {number && <Price className={textClassName}>{number} ETH</Price>}
    </Root>
  );
};

export default memo(UserBadge);
