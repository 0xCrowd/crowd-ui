import React, { FC } from 'react';

//#region styles
import { styled } from '@linaria/react';



const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: linear-gradient(93.35deg, #DFFDFF 10.24%, #FFE4FE 100%);
  box-shadow: 0px -4px 11px rgba(180, 250, 255, 0.3);
  border-radius: 10px;
`;

const Label = styled.label`
  margin-bottom: 16px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: #263238;
`;

interface InputProps {
  error?: string;
}

const StyledInput = styled.input<InputProps>`
  box-sizing: border-box;
  padding: 8px 12px;
  font-family: Inter;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.25px;
  background: rgba(255, 255, 255, 0.53);
  border-radius: 15px;
  border: ${({ error }) => error ? '1px solid red' : 'none'};
  outline: none;
  font-size: 14px;
  line-height: 16px;
  color: #5B666B;

  &::placeholder {
    font-family: Inter;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: #828282;
  }
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 9px;
  position: absolute;
  bottom: 5px;
  left: 24px;
  color: red;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
//#endregion

type PropsType = {
  label?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  error?: string;
  badge?: JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<PropsType> = ({ label, id, placeholder, value, error, badge, onChange, className }) => {
  return (
    <Root className={className}>
      <LabelContainer>
        <Label htmlFor={id}>{label}</Label>
        {badge}
      </LabelContainer>
      <StyledInput value={value} onChange={onChange} placeholder={placeholder} id={id} error={error}/>
      {error && <ErrorText>{error}</ErrorText>}
    </Root>
  );
};

export default Input;
