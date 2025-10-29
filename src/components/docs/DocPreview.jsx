import DOMPurify from "dompurify";
import styled from "styled-components";

const PreviewContainer = styled.div`
  height: 290px;
  width: 230px;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  background: var(--color-doc);
`;

const PreviewInner = styled.div`
  width: 100%;
  transform-origin: top left;
  transform: scale(0.6);
  width: calc(100% / 0.6);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & img {
    max-width: 100%;
    height: auto;
  }

  & * {
    box-sizing: border-box;
  }
`;

const DocPreview = ({ content }) => {
  return (
    <PreviewContainer role="document" aria-label="Document preview">
      <PreviewInner
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || "") }}
      />
    </PreviewContainer>
  );
};

export default DocPreview;