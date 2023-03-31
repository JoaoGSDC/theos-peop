import styled, { createGlobalStyle } from 'styled-components';
import { Button } from '@mui/material';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #27aefc;
    --secondary: #5ae1ff;
    --tertiary: #0177fb;
    --quaternary: #3e99ff;
    --quiternary: #42b8ff;
    --background-default: #fff;
    --background-complement: #f6f9ff;
    --background-extra: #f6f9ff;
    --text-primary: #1e1e1e;
    --text-secondary: #c4c4c4;
  }

  [data-theme='dark'] {
    --primary: #27aefc;
    --secondary: #5ae1ff;
    --tertiary: #0177fb;
    --quaternary: #3e99ff;
    --quiternary: #42b8ff;
    --background-default: #252736;
    --background-complement: #1e1d2b;
    --background-extra: #2f3042;
    --text-primary: #fff;
    --text-secondary: #66677c;
    --text-tertiary: #8f8f93;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  body {
    background: var(--background-complement);
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: var(--text-color);
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
  }

  div#__next {
    width: 100%;
    height: 100%;
    display: flex;
  }

  input {
    color: var(--text-primary) !important;
    height: 15px !important;
  }

  label {
    color: var(--text-secondary) !important;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    li {
      width: 100%;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: var(--text-secondary) !important;
  }

  .Mui-focused {
    color: var(--primary) !important;

    .MuiOutlinedInput-notchedOutline {
      border-color: var(--primary) !important;
    }
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: var(--primary) !important;
  color: var(--text-primary) !important;
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent !important;
  color: var(--primary) !important;
  border: 1px solid var(--primary) !important;
`;
