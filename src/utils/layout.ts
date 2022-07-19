import { css } from '@linaria/core';

const heightAuto = css`
  height: auto !important;
`;

export const LAYOUT_ID = '#Layout';

export const addLayoutHeightAuto = () => {
  const layout = window.document.querySelector("#Layout");

  if (layout) {
    layout.classList.add(heightAuto);
  }
};

export const removeLayoutHeightAuto = () => {
  const layout = window.document.querySelector("#Layout");

  if (layout) {
    layout.classList.remove(heightAuto);
  }
}