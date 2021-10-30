import React, { ReactElement } from "react";

//#region styled
import { styled } from "@linaria/react";

import rarible from "@assets/images/rarible.svg";

interface RootProps {
  background: string;
}

const Root = styled.a<RootProps>`
  height: 24px;
  width: 24px;
  background-image: ${({ background }) => `url(${background})`};
`;
//#endregion

interface Props {
  href: string;
}

const RaribleButton = ({ href }: Props): ReactElement => {
  return <Root background={rarible} href={href} />;
};

export default RaribleButton;
