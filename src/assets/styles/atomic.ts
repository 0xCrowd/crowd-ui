import { css } from '@linaria/core';

//#region margin bottom
export const mb2 = css`
  margin-bottom: 2px;
`;

export const mb4 = css`
  margin-bottom: 4px !important;
`;

export const mb6 = css`
  margin-bottom: 6px;
`;

export const mb8 = css`
  margin-bottom: 8px;
`;

export const mb10 = css`
  margin-bottom: 10px;
`;

export const mb12 = css`
  margin-bottom: 12px !important;
`;

export const mb18 = css`
  margin-bottom: 18px;
`;

export const mb20 = css`
  margin-bottom: 20px;
`;

export const mb24 = css`
  margin-bottom: 24px !important;
`;

export const mb28 = css`
  margin-bottom: 28px !important;
`;

export const mb36 = css`
  margin-bottom: 36px !important;
`;

export const mb45 = css`
  margin-bottom: 45px !important;
`;

export const mb62 = css`
  margin-bottom: 62px !important;
`;

//#endregion

//#region margin right
export const mr4 = css`
  margin-right: 4px !important;
`;

export const mr14 = css`
  margin-right: 14px;
`;

export const mr24 = css`
  margin-right: 24px;
`;

export const mr32 = css`
  margin-right: 32px;
`;

export const mr52 = css`
  margin-right: 52px !important;
`;

//#endregion

//#region margin left
export const ml10 = css`
  margin-left: 10px;
`;

export const ml52 = css`
  margin-left: 52px !important;
`;
//#endregion

//#region  margin top
export const mt10 = css`
  margin-top: 10px;
`;

export const mt20 = css`
  margin-top: 20px;
`;

//#endregion

//#region media
export const media = (size: 'mobile' | 'large') => {
  switch (size) {
    case 'mobile':
      return '@media (max-width: 420px)';

    case 'large':
      return '@media (min-width: 420px)';
    
    default:
      return '@media (max-width: 420px)'
  }
};

//#endregion

//#region height
export const h100 = css`
  height: 100%;
`;
//#endregion

//#region height
export const w100 = css`
  width: 100% !important;
`;
//#endregion
