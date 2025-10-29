import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: absolute;
  z-index: 50;
  min-width: 180px;
  border-radius: 12px;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.08);
  border: 1px solid rgba(0,0,0,0.06);
  padding: 6px 0;
  overflow: hidden;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  font-size: 0.9rem;
  background: transparent;
  border: none;
  color: ${(p) => (p.danger ? "var(--danger-color, #dc2626)" : "var(--color-text-secondary)")};
  cursor: pointer;

  &:hover {
    background: ${(p) => (p.danger ? "rgba(220,38,38,0.08)" : "var(--color-doc-hover)")};
    color: #fff;
  }

  &:focus {
    outline: 2px solid rgba(59,130,246,0.12);
    outline-offset: 2px;
  }
`;

const CustomMenu = ({ anchorEl, open, onClose, options = [], offsetX = 0, offsetY = 8 }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, onClose]);

    if (!open) return null;

    const rect = anchorEl?.getBoundingClientRect();
    const styles = rect
        ? {
            top: rect.bottom + offsetY,
            left: rect.left + offsetX,
        }
        : {};

    return (
        <MenuContainer ref={menuRef} style={styles} role="menu" aria-hidden={!open}>
            {options.map((option, idx) => (
                <MenuItem
                    key={idx}
                    onClick={() => {
                        option.onClick && option.onClick();
                        onClose && onClose();
                    }}
                    danger={option.danger}
                    role="menuitem"
                >
                    {option.label}
                </MenuItem>
            ))}
        </MenuContainer>
    );
};

export default CustomMenu;