import React, { ReactElement } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

//#region styles
import { styled } from "@linaria/react";
import Voting from "@app/components/voting";
import { mb20 } from "@assets/styles/atomic";
import { ModalModeEnum } from "@app/pages/crowd-page";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 1220px;
`;

//#endregion

interface Props {
  proposals: AdaptedProposal[];
  loading: boolean;
  isParticipants: boolean;
  makeVote: (proposalStream: string, option: number, amount: string) => void;
  className?: string;
}

const Proposals = ({
  proposals,
  loading,
  isParticipants,
  makeVote,
  className,
}: Props): ReactElement => {
  if (loading) {
    return (
      <Root className={className}>
        <SkeletonLoader
          width={640}
          height={342}
          background="linear-gradient(0deg,#263238,#263238)"
        />
      </Root>
    );
  }

  return (
    <Root className={className}>
      {proposals.map(({ proposal, type, price, till, votingPower, voted, against }) => (
        <Voting
          key={proposal}
          type={type}
          isParticipants={isParticipants}
          price={price}
          makeVote={(option: number, amount: string) =>
            makeVote(proposal, option, amount)
          }
          time={till}
          className={mb20}
          loading={loading}
          votingPower={votingPower}
          voted={voted}
          against={against}
        />
      ))}
    </Root>
  );
};

export default Proposals;
