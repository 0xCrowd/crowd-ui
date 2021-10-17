import React, { FC } from "react";
import cn from 'classnames';
import BigNumber from 'bignumber.js'

import Percentage from '@app/components/percentage';
import Button from '@app/components/button';

import { PercentEnum } from '@app/enums/percentage';

type PropsType = {
  title?: string;
  description?: string;
  voteAgree: number;
  voteDisagree: number;
  className?: string;
  status: string;
  onVote: (value: boolean, id: number) => void;
  id: number;
}

const Proposal: FC<PropsType> = ({ 
  title, 
  description, 
  voteAgree, 
  voteDisagree, 
  id, 
  onVote,
  status,
  className 
}) => {
  const all = new BigNumber("100000000000000000000");
  const bigFor = new BigNumber(voteAgree);
  let votePercent = new BigNumber(0);
  const hundred = new BigNumber(100);
  votePercent = bigFor.dividedBy(all).multipliedBy(hundred);
  
  const bigAgainst = new BigNumber(voteDisagree);
  let againstPercent = new BigNumber(0);
  againstPercent = bigAgainst.dividedBy(all).multipliedBy(hundred);

  console.log(bigFor.toString().length > 3, 'asd')

  return (
    // <div className={cn(s.proposalRow, className)}>
    //   <div className={s.leftBlock}>
    //     <p className={s.proposalTitle}>{title}</p>
    //     <p className={s.proposalDescription}>{description}</p>
    //   </div>
    //   <div className={s.rightBlock}>
    //     <p className={s.voting}>Voting</p>
    //     <div className={cn(s.row, s.mb12)}>
    //       <Button loading={status !== "0"} outlined small className={s.button} onClick={() => onVote(true, id)}>FOR</Button>
    //       <div className={s.percentBlock}>
    //         <p className={s.percentText}>
    //           {`${votePercent}% / ${bigFor.toString().length > 3 ? `${bigFor.toString().substr(0, 3)}...` : bigFor.toString()} TOKEN`}
    //         </p>
    //         <Percentage small className={s.percent} number={votePercent.toNumber()}/>
    //       </div>
    //     </div>
    //     <div className={s.row}>
    //       <Button loading={status !== "0"} small className={s.button} onClick={() => onVote(false, id)}>AGAINST</Button>
    //       <div className={s.percentBlock}>
    //         <p className={s.percentText}>
    //           {`${againstPercent}% / ${bigAgainst.toString().length > 3 ? `${bigAgainst.toString().substr(0, 3)}...` : bigAgainst.toString()} TOKEN`}
    //         </p>
    //         <Percentage small className={s.percent} type={PercentEnum.Danger} reverse number={againstPercent.toNumber()}/>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Proposal;
