import React, { FC, useEffect, useState } from 'react'

//#region styles
import { styled } from '@linaria/react';

import { bgLightGray } from '@app/assets/styles/constants';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 202px;
  height: 48px;
  background-color: ${bgLightGray};
  border-radius: 5px;
`;

const Number = styled.p`
  margin: 0;
  font-size: 22px;
  line-height: 28px;
  color: #999999;
`;
//#endregion

const plusZero = (number: number) => {
  let st = '';
  if (number.toString().length === 1) {
    st = `0${number}`
  } else {
    st = number.toString();
  }
  return st;
}

type Props = {
  time: string;
}

const Timer: FC<Props> = ({ time }) => {
  const [hours, setHours] = useState('-');
  const [minutes, setMinutes] = useState('-');
  const [seconds, setSeconds] = useState('-');
  
  useEffect(() => {
    const arr = time.split(':');

    let hours = +arr[0];
    let minutes = +arr[1];
    let seconds = +arr[2].split('.')[0];

    let hoursSt = plusZero(hours);
    let minutesSt = plusZero(minutes);
    let secondsSt = plusZero(seconds);

    const timer = () => {
      seconds -= 1;

      if (seconds < 0) {
        seconds = 59;
        

        minutes -= 1;

        if (minutes < 0) {
          minutes = 59;
          

          hours -= hours;
          
          if (hours === 0) {
            return false;
          }
        }
      }
      
      secondsSt = plusZero(seconds);
      minutesSt = plusZero(minutes);
      hoursSt = plusZero(hours);
      setHours(hoursSt);
      setMinutes(minutesSt);
      setSeconds(secondsSt);
    }

    const id = setInterval(timer, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Root>
      <Number>{`${hours} : ${minutes} : ${seconds}`}</Number>
    </Root>
  )
}

export default Timer
