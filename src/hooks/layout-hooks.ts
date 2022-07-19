import { RINKEBY_ID } from './../constants/chain';
import { useMetaMask } from 'metamask-react';
import { addLayoutHeightAuto, removeLayoutHeightAuto } from './../utils/layout';
import { useIsMobile } from './is-mobile';

export const useLayoutHeightAuto = (
  length: number,
  successLoading: boolean,
  successBlockchain: boolean,
) => {
  const { chainId } = useMetaMask();
  const isMobile = useIsMobile();
  const minLength = isMobile ? 0 : 3;

  if (length && length > minLength && successLoading && chainId === RINKEBY_ID && successBlockchain) {
    addLayoutHeightAuto();
  } else {
    removeLayoutHeightAuto();
  }
};

export const useAddLayoutHeightAuto = (isError: boolean) => {
  if (isError) {
    removeLayoutHeightAuto();
  } else {
    addLayoutHeightAuto();    
  }
  
};
