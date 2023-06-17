import styled from 'styled-components';
import { Content } from './pages.styles';

export const ViewContainer = styled(Content)`
  h2 {
    margin: 0px;
  }

  h3 {
    font-weight: 400;
    margin: 8px 0px;
  }
`;

export const HeaderProfessionalContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  h1 {
    margin: 0px;
  }

  h1:first-child {
    margin: 8px 0px;
  }

  h1:last-child {
    margin: 0px;
    margin-top: 0px;
    margin-left: 8px;
    color: var(--text-secondary);
  }

  button {
    display: flex;
    padding: 0px;
  }
`;

export const ViewField = styled.div`
  display: flex;

  h3:last-child {
    margin-left: 8px;
  }
`;

export const ViewFieldObservation = styled(ViewField)`
  flex-direction: column;

  h3 {
    margin-bottom: 0px;
    max-height: 80px;
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
  }

  h3:last-child {
    margin-bottom: 16px;
    margin-left: 0px;
  }
`;

export const GraphicsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 144px;
`;

export const ViewFieldsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
`;

export const FieldItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const FieldItemsContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-right: 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;

  button {
    width: 100%;
  }

  button:not(:first-child) {
    margin-left: 8px;
  }
`;
