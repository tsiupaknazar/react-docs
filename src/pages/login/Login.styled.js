import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary, #fff);
  color: var(--color-text-primary, #111827);
  padding: 2rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  text-align: center;
`;

export const BrandIcon = styled.div`
  display: block;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 3rem;
  margin: 0;
  color: inherit;
`;

export const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--color-bg-button, #2563EB);
  color: var(--btn-text, #fff);
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(2,6,23,0.08);
  transition: transform 120ms ease, filter 120ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 3px solid rgba(59,130,246,0.16);
    outline-offset: 2px;
  }
`;
