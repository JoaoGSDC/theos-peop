import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  background-image: url('assets/bg.png');
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #252736;
  background-blend-mode: multiply;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 35%;
  align-items: center;

  padding: 64px;
  border-radius: 8px;
  background-color: #0000005e;
  backdrop-filter: blur(4px);

  input {
    color: #fff !important;
  }

  img {
    margin-bottom: 16px;
  }

  .MuiFormControl-root {
    margin-bottom: 16px;
  }

  button {
    margin-top: 8px;
    width: 100%;
    color: #fff !important;
  }
`;

export const Figure = styled.figure`
  margin: 0px;
  width: 300px;

  img {
    width: 100%;
  }
`;
