import styled from 'styled-components';
import { PagesContainer } from './pages.styles';

export const HeaderHomePageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div:first-child {
    width: 100%;
  }
`;

export const HomePageContainer = styled(PagesContainer)`
  width: calc(100% - 768px);
`;
