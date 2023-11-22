import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ editorRef, initialValue }) => {
  const [editorValue, setEditorValue] = useState(initialValue || "");
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef) {
      editorRef(quillRef.current);
    }
  }, [editorRef]);

  const modules = {
    toolbar: [
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={editorValue}
      onChange={(value) => setEditorValue(value)}
      modules={modules}
      className="w-full md:h-[76vh] h-[73vh]"
    />
  );
};

export default QuillEditor;
