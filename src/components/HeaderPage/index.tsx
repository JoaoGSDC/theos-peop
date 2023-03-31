import { Container } from './styles';

interface IProps {
  main: string;
  subtext: string;
}

function HeaderPage({ main, subtext }: IProps) {
  return (
    <>
      <Container>
        <h1>{main}</h1>
        <h3>{subtext}</h3>
      </Container>
    </>
  );
}

export default HeaderPage;
