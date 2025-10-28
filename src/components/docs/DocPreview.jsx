import DOMPurify from 'dompurify';

const DocPreview = ({ content }) => {
  return (
    <div
      className="h-[290px] w-[230px] rounded-sm overflow-hidden shadow-sm"
      role="document"
      aria-label="Document preview"
    >
      <div
        className="w-full origin-top-left scale-[0.6]"
        style={{
          width: 'calc(100% / 0.6)',
          transformOrigin: 'top left'
        }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </div>
  );
};

export default DocPreview;
