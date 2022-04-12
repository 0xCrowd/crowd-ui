import { css } from "@linaria/core";
import { useEffect } from "react";

const heightAuto = css`
  height: auto !important;
`;

export const useLayoutHeightAuto = (
  length: number,
  successLoading: boolean
) => {
  const layout = window.document.querySelector("#Layout");
  const isMobile = window.screen.width < 421;
  const minLength = isMobile ? 0 : 3;

  if (layout) {
    if (length && length > minLength && successLoading) {
      layout.classList.add(heightAuto);
    } else {
      layout.classList.remove(heightAuto);
    }
  }
};

export const useLayoutDetailsHeightAuto = () => {
  const layout = window.document.querySelector("#Layout");

  if (layout) {
    layout.classList.add(heightAuto);
  }
};
