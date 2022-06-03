import React, { ReactElement } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

import Voting from "@app/components/voting";

import { ProposalChoice } from "@app/enums/proposal-choice-enum";

//#region styles
import { styled } from "@linaria/react";
import { mb20 } from "@assets/styles/atomic";

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
  makeVote: (
    proposalStream: number,
    choice: ProposalChoice,
    amount: string
  ) => void;
  onOpenPriceModal: () => void;
  className?: string;
}

const Proposals = ({
  proposals,
  loading,
  isParticipants,
  makeVote,
  onOpenPriceModal,
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
      {proposals.map(({ id, type, priceEth, till, myVote, all, against }) => (
        <Voting
          key={id}
          type={type}
          isParticipants={isParticipants}
          price={priceEth}
          makeVote={(choice: ProposalChoice, amount: string) => 
            makeVote(id, choice, amount)
          }
          time={till}
          className={mb20}
          loading={loading}
          votingPower={myVote}
          voted={all}
          against={against}
          onOpenPriceModal={onOpenPriceModal}
        />
      ))}
    </Root>
  );
};

export default Proposals;
