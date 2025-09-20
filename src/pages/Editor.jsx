import { useContext, useEffect, useRef, useState } from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';

import { extensions } from '../components/text-editor/Extensions';

import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

import { firestore } from '../firebase/firebase'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify'
import Loader from '../components/loader/Loader'
import Header from '../components/header/Header'


const Editor = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext)

    const { id } = useParams()
    const [userDoc, setUserDoc] = useState(null)
    const [loading, setLoading] = useState(true)
    const [initialContent, setInitialContent] = useState(null);
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

   useEffect(() => {
  if (!user?.uid) {
    setLoading(false);
    return;
  }
  const docRef = doc(firestore, "userDocs", user.uid, "docs", id);
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserDoc(data);
      if (data.content) {
        setInitialContent(data.content);
        setContent(data.content);
      } else {
        setInitialContent("<p></p>");
        setContent("<p></p>");
      }
    } else {
      setInitialContent("<p></p>");
      setContent("<p></p>");
    }
    setLoading(false);
  }, (error) => {
    console.error("Error loading document:", error);
    toast.error("Error loading document");
    setLoading(false);
  });

  return () => unsubscribe();
}, [user?.uid, id]);

    const handleSave = async () => {
        if (!editorRef.current) return;
        try {
            const html = editorRef.current.getHTML();
            const docRef = doc(firestore, 'userDocs', user.uid, 'docs', id);
            await updateDoc(docRef, { content: html });
            toast.success('Document successfully saved!');
        } catch (error) {
            console.error('Error saving document:', error);
            toast.error('Error saving document');
        }
    };

    const onEditorReady = (editor) => {
        editorRef.current = editor;
    };

    const onChangeContent = (value, editor) => {
        setContent(value);
        editorRef.current = editor;
    };

    if (loading || initialContent === null) {
        return <Loader />;
    }

    return (
        <div className={`min-h-screen bg-${theme}-100 text-black`}>
            <Header docName={userDoc?.name} handleSave={handleSave} docId={id}/>
            <RichTextEditor
                output='html'
                content={content}
                onChangeContent={onChangeContent}
                extensions={extensions}
                onReady={onEditorReady}
                className="rounded-none"
            />
            <ToastContainer />
        </div>
    );
};

export default Editor;