import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

//#region styles
import { styled } from "@linaria/react";

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BACKGROUND = "linear-gradient(0deg,#263238,#263238)";
//#endregion

const Skeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonLoader
        width="80%"
        height={32}
        background={BACKGROUND}
        style={{ marginTop: 40, marginBottom: 40 }}
      />
      <SkeletonLoader
        height={375}
        width="100%"
        background={BACKGROUND}
        style={{ marginBottom: 44 }}
      />
      <SkeletonLoader height={26} width="80%" background={BACKGROUND} />
      <SkeletonLoader
        height={18}
        width={93}
        background={BACKGROUND}
        style={{ marginBottom: 82, marginTop: 25 }}
      />
      <SkeletonLoader
        height={200}
        width="80%"
        background={BACKGROUND}
        style={{ marginBottom: 82, marginTop: 25 }}
      />
    </SkeletonWrapper>
  );
};

export default Skeleton;
