import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(103, 208, 137, 0.5);
  padding: 8px 0;
  display: flex;
  justify-content: center;
   
  header {
    margin: 0 auto;
    padding: 0 16px ;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 8%;
    }
    nav {
      a {
        color: #fff;
        
        text-decoration: none;
   
        font-size: 16px;
        & + a {
          margin-left: 32px;
        }
        &:hover {
          border-bottom: 1px solid;
        }
      }

      button: {
        align-self: end;
      }
    }
  }
`;