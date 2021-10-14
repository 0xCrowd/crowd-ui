import React, { FC, useState } from 'react';
import cn from 'classnames';
import Modal from 'react-modal';

import Percentage from '@app/components/percentage';
import Button from '@app/components/button';
import UserBadge from '@app/components/user-badge';
import Input from '@app/components/input';

import close from '@assets/images/close.svg';
import eth from '@assets/images/eth.svg';
import { round } from '../../utils/round';


type PropsType = {
  title?: string;
  description?: string;
  price: string;
  participants?: number,
  percentage: number,
  myCrowd: number;
  userData: {
    user: string,
    eth: string,
  }[];
  loading?: boolean;
  onDeposite: (eth: string) => void;
  modalVisible: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
}

const CrowdBlock: FC<PropsType> = ({
  title,
  description,
  price,
  participants = 0,
  percentage,
  myCrowd,
  userData,
  onDeposite,
  loading,
  modalVisible,
  onModalClose,
  onModalOpen
}) => {
  const [deposit, setDeposit] = useState('0');

  // const getPercentage = () => {
  //   console.log(myCrowd, 'cr')
  //   return round((toEth(myCrowd) * 100) / +price, 1);
  // };

  return (
    <></>
    // <div className={s.root}>
    //   <Modal
    //     isOpen={modalVisible}
    //     onRequestClose={onModalClose}
    //     className={s.modal}
    //     overlayClassName={s.overlay}
    //   >
    //     <div className={s.modalHeader}>
    //       <p className={s.modalTitle}>Strart a PARTY</p>
    //       <button className={s.closeButton}>
    //         <img src={close} alt="close" onClick={onModalClose}/>
    //       </button>
    //     </div>
    //     <Input 
    //       value={deposit}
    //       onChange={(e: any) => setDeposit(e.target.value)}
    //       label="deposite"
    //       className={s.mb12}
    //     />
    //     <Button loading={loading} onClick={() => onDeposite(deposit)}>add Eth</Button>
    //   </Modal>
    //     <p className={s.title}>{title}</p>
    //     <p className={s.description}>{description}</p>
    //     <div className={s.infoBlock}>
    //       <p className={cn(s.infoText, s.mb10)}>current price</p>
    //       <div className={s.ethBlock}>
    //         <div className={s.iconContainer}><img src={eth} alt="eth"/></div>
    //         <div className={s.ethColumn}>
    //           <p className={s.infoText}>{price}</p>
    //           <p className={s.infoText}>ETH</p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={s.row}>
    //       <p className={s.text}>Collected</p>
    //       <p className={s.text}>Participants</p>
    //     </div>
    //     <div className={s.row}>
    //       <div className={s.text}>{round(percentage, 1)}%</div>
    //       <div className={s.text}>{participants}</div>
    //     </div>
    //     <Percentage className={s.percentage} number={round(percentage, 1)} />
    //     <Button onClick={onModalOpen} loading={getPercentage() > 100}>+ Add funds</Button>
    //     <p className={s.funds}>{`Your funds: ${getPercentage()}% / ${toEth(myCrowd)} ETH`}</p>
    //     <hr className={s.hr} />
    //     <p className={s.userTitle}>User Party Name</p>
    //     <div className={s.users}>
    //       {userData.map(item => <UserBadge name={`${item.user.substr(0, 3)}...`} number={item.eth} />)}
    //     </div>
    // </div>
  );
};

export default CrowdBlock;
