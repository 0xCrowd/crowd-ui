import { css } from '@linaria/core';

const heightAuto = css`
  height: auto !important;
`;

export const useLayoutHeightAuto = (length: number, successLoading: boolean) => {
  const layout = window.document.querySelector('#Layout');
  if (layout) {
    if (length && successLoading) {
      layout.classList.add(heightAuto);
    } else {
      layout.classList.remove(heightAuto);
    }
  }
};
