import styled from "styled-components";

const ToastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: 0 8px 24px rgba(2, 6, 23, 0.08);
  border-radius: 8px;
  min-width: 240px;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text-primary);
`;

const Message = styled.span`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

function CustomToast({ title, message }) {
    return (
        <ToastWrapper role="status" aria-live="polite">
            {title && <Title>{title}</Title>}
            {message && <Message>{message}</Message>}
        </ToastWrapper>
    );
}

export default CustomToast;
