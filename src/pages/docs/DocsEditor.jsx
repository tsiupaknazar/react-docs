import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';
import { debounce } from 'lodash';

import { extensions } from '../../components/text-editor/Extensions';

import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

import { firestore } from '../../firebase/firebase'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'

import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import Header from '../../components/header/Header'

const DocsEditor = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();

  const isInitialLoad = useRef(true);
  const pdfRef = useRef(null);

  const [userDoc, setUserDoc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialContent, setInitialContent] = useState(null);
  const [content, setContent] = useState('');
  const [autosaveStatus, setAutosaveStatus] = useState('');

  const lastSavedRef = useRef('');

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    const docRef = doc(firestore, 'userDocs', user.uid, 'docs', id);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDoc(data);
          if (isInitialLoad.current) {
            setInitialContent(data.content || '<p></p>');
            setContent(data.content || '<p></p>');
            lastSavedRef.current = data.content || '<p></p>';
            isInitialLoad.current = false;
          }
        } else {
          if (isInitialLoad.current) {
            setInitialContent('<p></p>');
            setContent('<p></p>');
            lastSavedRef.current = '<p></p>';
            isInitialLoad.current = false;
          }
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading document:', error);
        toast.error('Error loading document');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid, id]);

  const debouncedSave = useCallback(
    debounce(async (newContent) => {
      if (!user?.uid || !id) return;
      if (newContent === lastSavedRef.current) return;
      try {
        const docRef = doc(firestore, 'userDocs', user.uid, 'docs', id);
        await updateDoc(docRef, { content: newContent });
        lastSavedRef.current = newContent;
        setAutosaveStatus('Saved successfully');
      } catch (error) {
        toast.error('Error autosaving document');
        setAutosaveStatus('Error saving document');
      }
    }, 1500),
    [user?.uid, id]
  );

  const onChangeContent = (value) => {
    setAutosaveStatus('');
    setContent(value);
    debouncedSave(value);
  };

  if (loading || initialContent === null) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen bg-primary text-primary`}>
      <div style={{ position: "absolute", left: "-9999px", top: 0 }} ref={pdfRef} dangerouslySetInnerHTML={{ __html: content }} />
      <Header docName={userDoc?.name} status={autosaveStatus} handleSave={() => debouncedSave.flush()} docId={id} />
      <RichTextEditor
        output='html'
        content={content}
        onChangeContent={onChangeContent}
        extensions={extensions}
        dark={theme === "dark"}
      />
    </div>
  );
};

export default DocsEditor;