import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

import { firestore } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

import Header from "../components/header/Header";
import { AuthContext } from "../context/AuthContext";

import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/loader/Loader";

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
        if (data.content) {
          editorRef.current.setContent(data?.content);
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
        <div className="flex items-center justify-center">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={userDoc?.content || "Initial text editor value"}
            apiKey={import.meta.env.VITE_TINYMCE_KEY}
            key={editorKey}
            init={{
              skin: window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "oxide-dark"
                : "oxide",
              content_css: window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "default",
              branding: false,
              width: "100%",
              resize: false,
              menubar: false,
              statusbar: false,
              plugins:
                "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists help charmap quickbars emoticons",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | align lineheight checklist bullist numlist | charmap emoticons | insertfile codesample",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              importcss_append: true,
              height: 900,

              content_style: `
                body {
                  background: ${currentTheme === "dark" ? "#1e1e1e" : "#fff"};
                  color: ${currentTheme === "dark" ? "#fff" : "#000"};
                }

                @media (min-width: 840px) {
                  html {
                    background: ${
                      currentTheme === "dark" ? "#1e1e1e" : "#eceef4"
                    };
                    min-height: 100%;
                    padding: 0 .5rem;
                  }

                  body {
                    background-color: ${
                      currentTheme === "dark" ? "#1e1e1e" : "#fff"
                    };
                    box-sizing: border-box;
                    margin: 1rem auto 0;
                    max-width: 820px;
                    min-height: calc(100vh - 1rem);
                    padding: 4rem 6rem 6rem 6rem;
                  }
                }
              `,
            }}
          />
        </div>
        <ToastContainer hideProgressBar={true} autoClose={3000} />
      </div>
    </>
  );
};

export default EditorPage;
