import styled from 'styled-components';
import { Content } from '../../../styles/pages.styles';

export const ViewContainer = styled(Content)`
  flex-direction: column;

  h3 {
    margin: 8px 0px;
  }
`;

export const ViewField = styled.div`
  display: flex;
  padding-top: 8px;

  .MuiFormControl-root:not(:last-child),
  .MuiAutocomplete-root {
    margin-right: 8px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;

export const FieldItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-right: 16px;
    width: calc(100% - 16px);
  }
`;

export const SkillRatingContainer = styled.div`
  width: 100%;
  margin-right: 16px;
`;

export const FooterButtonsContainer = styled.div`
  display: flex;
  width: calc(100% - 16px);
  margin-top: 32px;
  justify-content: space-between;

  button {
    min-width: 200px;
  }
`;
