import React from 'react';

import { TableContainer } from './styles';

const Table: React.FC = ({ children }) => {
  return (
    <TableContainer>
      {children}
    </TableContainer>
  );
}

export default Table;