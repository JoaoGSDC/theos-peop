import styled from 'styled-components';
import { Content } from '../../../styles/pages.styles';

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

  h3:last-child {
    margin-left: 0px;
    margin-top: 0px;
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
  flex-direction: column;
  height: 100%;
`;

export const FieldItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% + 1600px);
  height: 100%;

  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const FieldSkillsContainer = styled(FieldItemsContainer)`
  margin-top: 8px;
  flex-direction: row !important;
  width: 100% !important;

  div:first-child {
    margin-right: 8px;
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

export const Fields = styled.div`
  display: flex;
`;
