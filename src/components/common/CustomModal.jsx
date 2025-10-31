import React, { useEffect } from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  width: 450px;
  max-width: 94%;
  padding: 32px;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.2);
  border-radius: 12px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-size: 18px;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
`;

const Content = styled.div`
  margin-top: 8px;
  padding: 10px 0;
`;

const CustomModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Backdrop role="dialog" aria-modal="true" aria-label={title || "Modal"}>
      <ModalWrapper>
        <CloseButton aria-label="Close" onClick={onClose}>
          ✕
        </CloseButton>

        {title && <Title>{title}</Title>}

        <Content>{children}</Content>
      </ModalWrapper>
    </Backdrop>
  );
};

export default CustomModal;