import styled from 'styled-components';

export const InputFileCustom = styled.input`
  width: 100%;
  height: 100% !important;

  &:hover {
    cursor: pointer;
  }

  &::-webkit-file-upload-button {
    margin-right: 8px;
    font-size: 1rem;
    min-width: 144px;
    height: 48px;
    color: #fff;
    background-color: var(--primary);
    border: none;
    border-radius: 8px;

    &:hover {
      cursor: pointer;
    }
  }
`;
