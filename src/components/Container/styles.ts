import styled, {keyframes} from 'styled-components';

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 24px 64px;
  animation: ${appearFromTop} 1s;

  form{ 
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    align-content : center;
    justify-content: center;
    
    div {
      margin: 0 8px;
    }
  }
 
`;