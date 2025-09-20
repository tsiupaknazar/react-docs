const DocPreview = ({ content }) => {
  return (
    <div
      className="h-[290px] w-[230px] rounded-sm overflow-hidden"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default DocPreview;