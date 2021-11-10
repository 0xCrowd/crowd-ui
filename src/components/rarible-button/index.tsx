import React, { ReactElement } from "react";

//#region styled
import { styled } from "@linaria/react";

import rarible from "@assets/images/rarible.svg";
import { observer } from "mobx-react-lite";
import chainStore from "@app/stores/chainStore";

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
  tokenId: string;
}

const RaribleButton = observer(({ tokenId }: Props): ReactElement => {
  const { networkId } = chainStore;
  return <Root background={rarible} href={`https://${networkId === 4 ? 'rinkeby' : ''}rarible.com/token/${tokenId}`} />;
});

export default RaribleButton;
