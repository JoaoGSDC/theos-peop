import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  label {
    margin-right: 24px;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-secondary);
  }
`;

export const ButtonAddComponent = styled.button`
  width: 100%;
  border: 1px dashed var(--text-secondary);
  background-color: transparent;
  color: var(--text-secondary);
  height: 48px;
  cursor: pointer;
`;

export const SkillRatingsChildContainer = styled.div`
  height: 120px;
  overflow: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
    /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparente; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--text-secondary); /* color of the scroll thumb */
    border-radius: 8px; /* roundness of the scroll thumb */
  }
`;
