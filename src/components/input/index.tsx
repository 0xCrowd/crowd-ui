import React, { FC } from 'react';

//#region styles
import { styled } from '@linaria/react';
const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: #6F1875;
  border-radius: 10px;
`;

const Label = styled.label`
  margin-bottom: 16px;
  font-family: Inter;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  font-weight: 500;
  line-height: 16px;
  color: #FFFFFF;
`;

const StyledInput = styled.input`
  height: 40px;
  padding-left: 12px;
  font-family: Inter;
  font-weight: bold;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.25px;
  background: #4A2556;
  border-radius: 15px;
  border: none;
  color: #FFF;

  &::placeholder {
    font-family: Inter;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: #F3F3F3;
  }
`;
//#endregion

type PropsType = {
  label?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<PropsType> = ({ label, id, placeholder, value, onChange, className }) => {
  return (
    <Root className={className}>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput value={value} onChange={onChange} placeholder={placeholder} id={id} />
    </Root>
  );
};

export default Input;
