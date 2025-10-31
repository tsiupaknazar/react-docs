import styled from "styled-components";

export const Page = styled.div`
  background: var(--color-bg-primary);
  min-height: 100vh;
`;

export const Section = styled.section`
  padding-bottom: 2.5rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;

  @media (min-width: 768px) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
`;

export const Inner = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

export const Title = styled.h2`
  color: var(--color-text-primary);
  font-size: 1.125rem;
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-button);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  gap: 0.5rem;
  font-weight: 600;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;

  width: 100%;
`;

export const ActionButton = styled.button`
  background: ${(p) => (p.danger ? "#ef4444" : "var(--color-bg-button)")};
  color: ${(p) => (p.danger ? "white" : "white")};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: ${(p) => (p.danger ? "1px " : "1px solid rgba(0,0,0,0.06)")};
  cursor: pointer;
  width: 50%;
  font-weight: 600;

  &:hover {
    background: ${(p) => (p.danger ? "#ff0000" : "var(--color-bg-button-hover)")};
    color: ${(p) => (p.danger ? "white" : "var(--color-text-accent)")};
  }
`;

export const CreateButton = styled(ActionButton)`
  background: var(--color-bg-button);
  color: white;
  padding: 0.7rem 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-bg-button)
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: var(--color-bg-primary);
    transition: background 0.3s;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid rgba(0,0,0,0.04);
  color: var(--color-text-primary);
  outline: none;
  font-weight: 500;
  font-size: 0.9rem;
`;

export const Select = styled.select`
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.8rem;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: 0.5rem;
  border: 1px solid rgba(0,0,0,0.04);
  outline: none;
`;