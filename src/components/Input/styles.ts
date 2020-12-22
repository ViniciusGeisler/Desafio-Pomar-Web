import styled, { css } from 'styled-components';
 
interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: rgba(255, 255, 255, 0.2);
  
  border-radius: 10px ;
  border: 4px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
  width: 100%;
  color: #FFF;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
 
  ${props =>
    props.isFocused &&
    css`
      color: #014c73;
      border-color:#014c73;
    `}
  ${props =>
    props.isField &&
    css`
      color: #014c73;
      border-color:#014c73;
    `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #666660;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

