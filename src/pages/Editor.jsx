import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

import { firestore } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

import Header from "../components/header/Header";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import { EditorContent } from "../components/text-editor";

const EditorPage = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [editorKey, setEditorKey] = useState(0);

  const { id } = useParams();

  const editorRef = useRef(null);

  const handleSave = async () => {
    try {
      const docRef = doc(
        firestore,
        "userDocs",
        `${user?.uid}`,
        "docs",
        `${id}`
      );
      await updateDoc(docRef, { content: editorRef.current.getContent() });
      toast.success("Document successfully saved!");
    } catch (error) {
      toast.error("Error saving document");
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserDoc = async () => {
      const docRef = doc(
        firestore,
        "userDocs",
        `${user?.uid}`,
        "docs",
        `${id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserDoc(data);
        if (data.content && editorRef.current) {
          editorRef.current.setContent(data.content);
        }
      }
      setLoading(false);
    };
    getUserDoc();
  }, [id, user?.uid]);

  useEffect(() => {
    setCurrentTheme(theme);
    setEditorKey((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <>
      {loading && <Loader />}
      <div>
        <Header docName={userDoc?.name} handleSave={handleSave} />
        <EditorContent
          userDoc={userDoc}
          editorRef={editorRef}
          currentTheme={currentTheme}
          editorKey={editorKey}
        />
        <ToastContainer hideProgressBar={true} autoClose={3000} theme={theme} />
      </div>
    </>
  );
};

export default EditorPage;
