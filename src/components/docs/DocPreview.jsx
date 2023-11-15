const DocPreview = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default DocPreview;
