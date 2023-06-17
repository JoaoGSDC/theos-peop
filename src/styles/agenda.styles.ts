import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 140px);

  div:first-child {
    width: 70%;
    margin-right: 8px;
  }

  div:last-child {
    width: 30%;

    h2 {
      margin-top: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        font-size: 24px;
        color: var(--text-primary);
        background-color: transparent;
        border: none;
        transition: 0.2s;

        &:hover {
          cursor: pointer;
          color: var(--text-secondary);
        }
      }
    }
  }

  ul {
    margin: 0px;
    padding: 0px;

    li {
      list-style-type: none;
      margin-bottom: 16px;

      div {
        width: 100% !important;
        color: var(--text-primary);
        background-color: var(--background-complement);
        padding-left: 8px;

        &:first-child {
          text-align: center;
          background-color: var(--quaternary);
          border-radius: 8px 8px 0px 0px;
        }

        &:last-child {
          border-radius: 0px 0px 8px 8px;
        }
      }
    }
  }
`;

export const FieldItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;

  &:not(:last-child) {
    margin-right: 16px;
    width: calc(100% - 16px);
  }
`;

export const ViewField = styled.div`
  display: flex;
  margin-bottom: 16px;

  .MuiFormControl-root:first-child {
    margin-right: 16px;
  }
`;
