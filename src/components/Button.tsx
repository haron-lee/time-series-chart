import React from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  $activeBtn?: boolean;
  $solo?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, $activeBtn = false, $solo } = props;
  return (
    <StyledButton type='button' onClick={onClick} $activeBtn={$activeBtn} $solo={$solo}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  padding: 20px 25px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border: 1px solid var(--primary);
  border-radius: 30px;
  box-shadow: 4px 4px 2px #cbd8dd;
  transition: 0.3s;
  background-color: var(--primary);

  &:active {
    box-shadow: 0px 0px;
    transform: translate(4px, 4px);
  }

  ${(props) =>
    props.$activeBtn &&
    css`
      box-shadow: 0px 0px;
      transform: translate(4px, 4px);
      background-color: #467a8c;
    `}

  ${(props) =>
    props.$solo &&
    css`
      color: white;
      border: 1px solid var(--red);
      background-color: var(--red);
      box-shadow: 4px 4px 0px #fd8147;
      margin-left: auto;
    `}
`;

export default Button;
