import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

import { auth, firestore } from "../firebase";
import { doc, getDoc } from "@firebase/firestore";
import { signOut } from "@firebase/auth";

import { Description, Download } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box, Modal } from '@mui/material';

import StateToPdfMake from "draft-js-export-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import TextEditor from '../components/TextEditor';

const Editor = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const { id } = useParams();

  if (user === null) navigate("/");

  useEffect(() => {
    const getUserDoc = async () => {
      const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", `${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserDoc(docSnap.data());
      else navigate("/");
    }
    getUserDoc();
  }, [id, user?.uid, navigate])
  return (
    <>
      <header className="bg-white flex justify-between items-center py-2 px-9">
        <span className="cursor-pointer">
          <Link to="/">
            <Description sx={{ color: '#4385F3', width: '40px', height: '40px' }} />
          </Link>
        </span>
        <div className="flex-grow px-2">
          <h2 className="text-gray-700 text-2xl">{userDoc?.name}</h2>
        </div>
        <Button
          className="!bg-[#1A73E8] !text-white hover:bg-blue-500 !rounded-md md:inline-flex h-10 p-2"
          onClick={() => {
            const stateToPdfMake = new StateToPdfMake(userDoc?.editorState);
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake
              .createPdf(stateToPdfMake.generate())
              .download(`${userDoc?.name}.pdf`);
          }}
        >
          <Download />
          <span>Download</span>
        </Button>
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          title={user?.displayName}
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-full h-10 w-10 ml-5"
        />
      </header>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='absolute top-[50%] left-[50%] w-[auto] p-6 border-2 bg-white shadow-lg rounded-xl' style={{ transform: 'translate(-50%, -50%)' }}>
          <p className='font-light'>Do you really want to exit?</p>
          <div className='flex items-center justify-around mt-5'>
            <button
              onClick={() => {
                navigate("/")
                signOut(auth);
                setUser(null);
              }}
              className='bg-red-500 text-white px-8 py-2 rounded-xl hover:shadow-2xl hover:bg-red-600'
            >
              Yes
            </button>
            <button
              className='bg-white text-blue-500 px-8 py-2 rounded-xl hover:bg-gray-100' onClick={() => setOpen(false)}>No</button>
          </div>
        </Box>
      </Modal>
      <TextEditor uid={user?.uid} id={id} />
    </>
  );
}

export default Editor