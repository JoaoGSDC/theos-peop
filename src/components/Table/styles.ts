import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

export const TableGrid = styled(DataGrid)`
  color: var(--text-primary) !important;
  border-color: var(--background-extra) !important;

  .MuiDataGrid-main {
    color: var(--text-primary);
  }

  .MuiTablePagination-displayedRows {
    color: var(--text-primary) !important;
  }

  .MuiTablePagination-actions {
    color: var(--text-primary) !important;
  }

  .MuiButtonBase-root {
    color: var(--text-primary) !important;
  }

  .MuiDataGrid-virtualScroller {
    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
      /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: transparente; /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--text-secondary); /* color of the scroll thumb */
      border-radius: 8px; /* roundness of the scroll thumb */
    }
  }

  div {
    border-color: var(--background-extra) !important;
  }
`;
