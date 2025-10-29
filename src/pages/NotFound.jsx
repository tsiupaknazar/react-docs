import styled from "styled-components";
import { Link } from "react-router-dom";

const Page = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  margin: 2rem 0;
  max-width: 40rem;
  text-align: center;
`;

const CodeRow = styled.h2`
  margin: 0 0 1rem 0;
  font-weight: 800;
  font-size: 6rem;
  line-height: 1;
  color: #4385F3;
  display: flex;
  gap: 0.5rem;
`;

const Digit = styled.span`
  cursor: pointer;
  transition: color 160ms ease;
  &:hover {
    color: #2563eb;
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--color-text-primary);
`;

const BackButton = styled(Link)`
  padding: 0.6rem 1.5rem;
  border-radius: 0.5rem;
  background: #2563eb;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: background 120ms ease;
  &:hover {
    background: #1e40af;
  }
`;

const NotFound = () => {
  return (
    <Page>
      <Container>
        <CodeRow aria-hidden>
          <Digit>4</Digit>
          <Digit>0</Digit>
          <Digit>4</Digit>
        </CodeRow>

        <Message>Sorry, we couldn't find this page.</Message>

        <BackButton to="/">Back to home</BackButton>
      </Container>
    </Page>
  );
};

export default NotFound;