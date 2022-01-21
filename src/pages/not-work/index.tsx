import React from "react";

import GradientBorderButton from "@app/components/gradient-border-button";
import { ButtonSize } from "@app/components/button";

//#region styles
import { styled } from "@linaria/react";
import { textPrimary } from "@app/assets/styles/constants";
import { mb24, mb28 } from "@assets/styles/atomic";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #141414;
`;

const Title = styled.p`
  margin: 5px;
  font-size: 26px;
  font-weight: 500;
  color: ${textPrimary};
`;

//#endregion

const NotFoundPage = () => {
  return (
    <Root>
      <Title>Unfortunately CrowdApp is not available right now 🙁</Title>
      <Title>
        Our magical elves are already working on the problem 🎅🦹🧙‍♀️🦸‍♂️
      </Title>
      <Title className={mb28}>
        We plan to return access in less than a day 😎
      </Title>
      <Title className={mb24}>In the meantime, join our discord to hang out 💃🕺</Title>
      <GradientBorderButton
        onClick={() => (window.location.href = "https://discord.gg/mmgMGm7m5K")}
        size={ButtonSize.large}
      >
        Go to Discrod
      </GradientBorderButton>
    </Root>
  );
};

export default NotFoundPage;
