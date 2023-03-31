import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;

  h1 {
    margin: 0px;
    color: var(--text-primary);
    font-weight: 600;
  }

  h3 {
    margin: 0px;
    margin-top: 8px;
    color: var(--text-secondary);
    font-weight: 600;
  }
`;
