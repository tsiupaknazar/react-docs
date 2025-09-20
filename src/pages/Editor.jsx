import { useContext, useEffect, useRef, useState } from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';

import { extensions } from '../components/text-editor/Extensions';

import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

import { firestore } from '../firebase/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

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

    // Load content from Firestore
    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }
        const load = async () => {
            try {
                const docRef = doc(firestore, 'userDocs', user.uid, 'docs', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserDoc(data);
                    if (data.content) {
                        setInitialContent(data.content);
                        setContent(data.content);
                    } else {
                        setInitialContent('<p></p>');
                        setContent('<p></p>');
                    }
                } else {
                    setInitialContent('<p></p>');
                    setContent('<p></p>');
                }
            } catch (error) {
                console.error('Error loading document:', error);
                toast.error('Error loading document');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [user?.uid, id]);

    // Save content to Firestore
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

    // Editor instance callback
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
        <div className={`min-h-screen p-4 bg-${theme}-100 text-black`}>
            <Header docName={userDoc?.name} handleSave={handleSave} />
            <RichTextEditor
                output='html'
                content={content}
                onChangeContent={onChangeContent}
                extensions={extensions}
                onReady={onEditorReady}
            />
            <ToastContainer />
        </div>
    );
};

export default Editor;