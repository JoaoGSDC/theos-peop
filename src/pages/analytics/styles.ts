import styled from 'styled-components';
import { Card } from '../../styles/pages.styles';

export const AnalyticsCard = styled(Card).attrs((props: { isFilters: boolean }) => props)`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: ${(props) => (!props.isFilters ? '250px' : '60px')};

  .apexcharts-tooltip-title {
    background: var(--background-extra) !important;
    color: var(--text-primary) !important;
  }

  .apexcharts-tooltip {
    background: var(--background-default) !important;
    color: var(--text-primary) !important;
  }

  .apexcharts-menu {
    background-color: var(--background-default) !important;

    .apexcharts-menu-item {
      text-align: left;
      background-color: var(--background-complement) !important;
      padding: 8px 0px;
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

export const ViewField = styled.div`
  display: flex;
  padding-top: 8px;

  .MuiFormControl-root:not(:last-child) {
    margin-right: 8px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  button {
    width: 200px;
    height: 48px;
  }
`;

export const GroupGraphics = styled.div`
  display: flex;
  width: 100%;

  div {
    flex: 1;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }
`;
