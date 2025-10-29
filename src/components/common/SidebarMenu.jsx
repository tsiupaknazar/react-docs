import styled from "styled-components";
import { FileSpreadsheet, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(0,0,0,0.4);
  opacity: ${(p) => (p.show ? 1 : 0)};
  transition: opacity 300ms ease;
  pointer-events: ${(p) => (p.show ? "auto" : "none")};
`;

const Panel = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  height: 100%;
  width: 16rem; /* 64 */
  background: var(--color-bg-primary);
  box-shadow: 0 10px 30px rgba(2,6,23,0.2);
  transform: translateX(${(p) => (p.show ? "0" : "-100%")});
  transition: transform 300ms ease;
  display: flex;
  flex-direction: column;
  color: var(--color-text-primary);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  padding: 6px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;

  &:hover {
    background: var(--color-bg-secondary);
  }
`;

const Nav = styled.nav`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: inherit;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    background: var(--color-bg-secondary);
  }

  &:focus {
    outline: 2px solid rgba(59,130,246,0.25);
    outline-offset: 2px;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SidebarMenu = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // start animation next frame
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const first = panelRef.current.querySelector(
      'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus?.();
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <Backdrop show={animateIn} onClick={() => onClose?.()} aria-hidden="true" />
      <Panel ref={panelRef} show={animateIn} role="navigation" aria-label="Main menu">
        <PanelHeader>
          <Title>Menu</Title>
          <CloseButton onClick={onClose} aria-label="Close menu">✕</CloseButton>
        </PanelHeader>

        <Nav>
          <NavItem to="/" onClick={onClose}>
            <IconWrapper><FileText size={20} color="#4385F3" /></IconWrapper>
            Docs
          </NavItem>

          <NavItem to="/spreadsheets" onClick={onClose}>
            <IconWrapper><FileSpreadsheet size={20} color="#22c55e" /></IconWrapper>
            Spreadsheets
          </NavItem>
        </Nav>
      </Panel>
    </>
  );
};

export default SidebarMenu;
// ...existing code...