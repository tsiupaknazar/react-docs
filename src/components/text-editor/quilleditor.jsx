import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const QuillEditor = () => {
  const [editorValue, setEditorValue] = useState("");
  return (
    <ReactQuill
      value={editorValue}
      onChange={(value) => setEditorValue(value)}
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["clean"],
        ],
      }}
      className="w-full border-2 border-red-700 ql-toolbar ql-icon"
    />
  );
};

export default QuillEditor;
