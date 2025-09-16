import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import { firestore } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import Header from "../components/header/Header";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
// import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
// import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import MenuBar from "../components/text-editor/MenuBar";
import EditorContentWrapper from "../components/text-editor/EditorContentWrapper";
import SaveLoadControls from "../components/text-editor/SaveLoadControls";

const TiptapEditorPage = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [editorKey, setEditorKey] = useState(0);

  const { id } = useParams();
  const editorRef = useRef(null);

  const editor = useEditor({
    key: editorKey,
    extensions: [
      StarterKit.configure({ history: true }),
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      CodeBlock,
      Code,
      Highlight,
      // TextStyle,
      Color,
      Link.configure({ openOnClick: false }),
      Image,
      // Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      editorRef.current = editor;
    },
  });

  // Load Firestore document
  useEffect(() => {
    const getUserDoc = async () => {
      const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", `${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserDoc(data);
        if (data.content && editor) {
          editor.commands.setContent(data.content);
        }
      }
      setLoading(false);
    };
    getUserDoc();
  }, [id, user?.uid, editor]);

  // Handle theme changes
  useEffect(() => {
    setCurrentTheme(theme);
    setEditorKey((prev) => prev + 1);
  }, [theme]);

  const handleSave = async () => {
    if (!editorRef.current) return;
    try {
      const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", `${id}`);
      await updateDoc(docRef, { content: editorRef.current.getHTML() });
      toast.success("Document successfully saved!");
    } catch (error) {
      toast.error("Error saving document");
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen p-4 bg-${currentTheme}-100`}>
      <Header docName={userDoc?.name} handleSave={handleSave} />
      {editor && (
        <>
          <MenuBar editor={editor} />
          <EditorContentWrapper editor={editor} />
          <SaveLoadControls editor={editor} />
        </>
      )}
      <ToastContainer hideProgressBar={true} autoClose={3000} theme={theme} />
    </div>
  );
};

export default TiptapEditorPage;
