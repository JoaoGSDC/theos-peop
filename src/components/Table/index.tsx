import React from 'react';
import { TableGrid } from './styles';

interface IProps {
  columns: any[];
  rows: any[];
  onEdit?: boolean;
  hideFooter?: boolean;
  pageSize?: number;
  onCellClick?: any;
}

function Table({ columns, rows, onEdit = false, hideFooter = false, pageSize = 7, onCellClick = {} }: IProps) {
  return (
    <>
      <TableGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7]}
        hideFooter={hideFooter}
        onCellClick={onCellClick}
      />
    </>
  );
}

export default Table;
