import DOMPurify from 'dompurify';

const DocPreview = ({ content }) => {
  return (
    <div
      className="h-[290px] w-[230px] rounded-sm overflow-hidden shadow-sm"
      role="document"
      aria-label="Document preview"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};

export default DocPreview;
