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
  const [days, setDays] = useState('-');
  const [hours, setHours] = useState('-');
  const [minutes, setMinutes] = useState('-');
  const [seconds, setSeconds] = useState('-');
  
  useEffect(() => {
    const date1 = new Date();
    const date2 = new Date(time);

    // @ts-ignore
    let diff = (date2 - date1)/1000;
    diff = Math.abs(Math.floor(diff));

    let days = Math.floor(diff/(24*60*60));
    let seconds = diff - days * 24*60*60;

    let hours = Math.floor(seconds/(60*60));
    seconds = seconds - hours * 60*60;

    let minutes = Math.floor(seconds/(60));
    seconds = seconds - minutes * 60;

    let hoursSt = plusZero(hours);
    let minutesSt = plusZero(minutes);
    let secondsSt = plusZero(seconds);
    let daysSt = plusZero(days);

    const timer = () => {
      seconds -= 1;

      if (seconds < 0) {
        seconds = 59;
        

        minutes -= 1;

        if (minutes < 0) {
          minutes = 59;
          

          hours -= hours;
          
          if (hours < 0) {
            hours = 23;

            days -= 1;

            if (days === 0) {
              return false;
            }
          }
        }
      }
      
      secondsSt = plusZero(seconds);
      minutesSt = plusZero(minutes);
      hoursSt = plusZero(hours);
      daysSt = plusZero(days);
      setHours(hoursSt);
      setMinutes(minutesSt);
      setSeconds(secondsSt);
      setDays(daysSt);
    }

    const id = setInterval(timer, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Root>
      <Number>{`${days} : ${hours} : ${minutes} : ${seconds}`}</Number>
    </Root>
  )
}

export default Timer
