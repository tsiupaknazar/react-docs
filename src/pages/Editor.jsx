import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "@firebase/firestore";

import Header from "../components/header/Header";
import { AuthContext } from "../context/AuthContext";

import { Editor } from "@tinymce/tinymce-react";

const EditorPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const editorRef = useRef(null);

  const handleSave = () => {
    localStorage.setItem("content", editorRef.current.getContent());
  }

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
      if (docSnap.exists()) setUserDoc(docSnap.data());
    };
    getUserDoc();
  }, [id, user?.uid, navigate]);
  return (
    <div>
      <Header docName={userDoc?.name} />
      <button onClick={handleSave}>Test Save</button>
      <div className="flex items-center justify-center">
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={localStorage.getItem("content") || "Initial text editor value"}
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          init={{
            branding: false,
            width: "100%",
            resize: false,
            menubar: false,
            statusbar: false,
            plugins:
              "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists help charmap quickbars emoticons",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | align lineheight checklist bullist numlist | charmap emoticons | insertfile codesample",
            autosave_ask_before_unload: true,
            autosave_interval: "30s",
            autosave_prefix: "{path}{query}-{id}-",
            autosave_restore_when_empty: false,
            autosave_retention: "2m",
            image_advtab: true,
            image_list: [
              { title: "My page 1", value: "https://www.tiny.cloud" },
              { title: "My page 2", value: "http://www.moxiecode.com" },
            ],
            importcss_append: true,
            height: 900,
            content_style: `
            body {
              background: #fff;
            }
    
            @media (min-width: 840px) {
              html {
                background: #eceef4;
                min-height: 100%;
                padding: 0 .5rem;
              }
    
              body {
                background-color: --var(bg-color);
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
    </div>
  );
};

export default EditorPage;
