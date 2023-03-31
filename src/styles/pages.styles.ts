import { Card as CardMUI } from '@mui/material';
import styled from 'styled-components';

export const PagesContainer = styled.div`
  display: flex;
  margin: 16px;
  width: 100%;
  min-height: calc(100vh - 16px);
  margin-right: 24px;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparente; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--text-secondary); /* color of the scroll thumb */
    border-radius: 8px; /* roundness of the scroll thumb */
  }
`;

export const Card = styled(CardMUI)`
  color: var(--text-primary) !important;
  background-color: var(--background-default) !important;
  padding: 16px;
  height: 100%;
  margin-bottom: 24px;
`;

export const Content = styled.div`
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparente; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--text-secondary); /* color of the scroll thumb */
    border-radius: 8px; /* roundness of the scroll thumb */
  }
`;
