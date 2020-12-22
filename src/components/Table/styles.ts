import styled from 'styled-components';

export const TableContainer = styled.section`
margin-top: 32px;
display: flex;
justify-content: center;
table {
  width: 100%;
  border-spacing: 0 8px;
  th {
    color: #FFFF;
    font-weight: normal;
    padding: 20px 32px;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
  }
  td {
    padding: 20px 32px;
    border: 0;
    background: #fff;
    font-size: 16px;
    font-weight: normal;
    color: #969cb3;
    &.title {
      color: #363f5f;
    }
  }
  td:first-child {
    border-radius: 8px 0 0 8px;
  }
  td:last-child {
    border-radius: 0 8px 8px 0;
  }
}
button{
  background:  transparent;
  border: none;
}
`;