import React from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "lucide-react";

const Wrapper = styled.div`
  display: none;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  border: 2px solid var(--color-bg-input);
  background: transparent;
  color: var(--color-text-primary);
  box-sizing: border-box;
  transition: box-shadow 160ms ease, color 160ms ease;

  min-width: 50%;

  &:focus-within {
    color: var(--color-text-secondary);
    box-shadow: 0 6px 18px rgba(2, 6, 23, 0.06);
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  line-height: 0;
`;

const Input = styled.input`
  flex: 1 1 auto;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  font-size: 1rem;
  color: var(--color-text-primary);

  &::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.9;
  }
`;

const Search = ({ handleSearchChange }) => {
  return (
    <Wrapper role="search" aria-label="Search documents">
      <Icon aria-hidden>
        <SearchIcon size={18} />
      </Icon>

      <Input
        type="text"
        placeholder="Search..."
        aria-label="Search"
        onChange={handleSearchChange}
      />
    </Wrapper>
  );
};

export default Search;