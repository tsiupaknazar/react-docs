import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 18rem;
  font-family: inherit;
  z-index: 10;
`;

const ToggleButton = styled.button`
  width: 100%;
  color: #fff;
  padding: 0.7rem 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(p) => p.bg || "var(--color-bg-button)"};
  border: none;
  cursor: pointer;
  font-weight: 600;
  &:focus {
    outline: 3px solid rgba(59,130,246,0.2);
    outline-offset: 2px;
  }
`;

const Menu = styled.ul`
  position: absolute;
  margin-top: 0.5rem;
  width: 100%;
  background: var(--color-bg-primary);
  border: 1px solid rgba(0,0,0,0.06);
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(2,6,23,0.08);
  list-style: none;
  max-height: 16rem;
  overflow: auto;
`;

const Item = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${(p) => (p.active ? "var(--color-doc-hover)" : "transparent")};
  color: ${(p) => (p.active ? "#fff" : "inherit")};
  font-weight: ${(p) => (p.active ? 700 : 400)};

  &:hover {
    background: var(--color-doc-hover);
    color: #fff;
  }
`;

const Dropdown = ({ options, value, onChange, placeholder = "Select...", color }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Wrapper ref={dropdownRef}>
      <ToggleButton
        onClick={() => setOpen((prev) => !prev)}
        bg={color}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span aria-hidden>{open ? "▲" : "▼"}</span>
      </ToggleButton>

      {open && (
        <Menu role="listbox" aria-activedescendant={value}>
          {options.map((opt) => (
            <Item
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              active={value === opt.value}
              role="option"
              aria-selected={value === opt.value}
            >
              <span>{opt.label}</span>
            </Item>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};

export default Dropdown;