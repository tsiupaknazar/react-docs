import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Folder, MoreVert } from '@mui/icons-material';
import { firestore } from '../firebase'
import { addDoc, collection, serverTimestamp, onSnapshot } from "firebase/firestore"

import { AuthContext } from "../context/AuthContext";

import Header from '../components/Header'
import { Box, Modal } from '@mui/material';
import DocRow from '../components/DocRow';


const Home = () => {
  const [input, setInput] = useState("");
  const [userDoc, setUserDoc] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  if (user === null) navigate("/login");
  const createDoc = async () => {
    if (!input) return;
    setInput("");
    setOpen(false);

    const docRef = await addDoc(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      {
        name: `${input}`,
        time: serverTimestamp()
      }
    );
    navigate(`/doc/${docRef?.id}`)
  }
  useEffect(() => {
    const unsub = onSnapshot(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      (snap) => {
        setUserDoc(
          snap.docs?.map((doc) => ({
            id: doc?.id,
            ...doc.data(),
          }))
        );
      }
    );
    return () => unsub();
  }, [user?.uid]);
  return (
    <div>
      <Header />
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className='max-w-3xl mx-auto'>
          <div className='py-6 flex items-center justify-between'>
            <h2 className='text-gray-700'>Start a new document</h2>
            <MoreVert />
          </div>
          <div>
            <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700' onClick={handleOpen}>
              <img src="https://links.papareact.com/pju" alt="add-doc" />
            </div>
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
          </div>
        </div>
      </section>
      <section className='bg-white px-10 pb-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className="flex pb-5 items-center justify-between">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Folder />
          </div>
        </div>
        {userDoc.length === 0 ? (
          <div className='w-full text-center py-5'>No Documents</div>
        ) : (
          ""
        )}
        {userDoc?.map((doc) => (
          <DocRow 
           id={doc?.id}
           key={doc?.id}
           fileName={doc?.name}
           date={doc?.time}
          />
        ))}
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='absolute top-[50%] left-[50%] w-[300px] p-6 border-2 bg-white shadow-lg rounded-xl' style={{ transform: 'translate(-50%, -50%)' }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            createDoc();
          }}>
            <input type="text"
              className='p-2 w-full bg-gray-200 rounded-lg outline-none'
              placeholder='Enter name of the document...'
              onChange={({target}) => setInput(target.value)}
              value={input}
            />
            <div className='flex items-center justify-around mt-5'>
              <button className='bg-white text-blue-500 px-6 py-2 rounded-xl hover:bg-gray-100' onClick={handleClose}>Cancel</button>
              <button className='bg-blue-500 text-white px-6 py-2 rounded-xl hover:shadow-2xl hover:bg-blue-600'>Create</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default Home