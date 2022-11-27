import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from '../firebase';

import { Article, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button, Modal, Box } from '@mui/material';
const DocRow = ({ id, fileName, date }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useContext(AuthContext);

    const deleteDocument = async (id) => {
        try {
            const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", id);
            if (docRef) {
                deleteDoc(docRef);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='flex max-w-3xl mx-auto items-center p-4 rounded-lg hover:bg-gray-300 cursor-pointer text-gray-700 text-sm'>
                <Article style={{color: '#1A73E8'}}/>

                <Link to={`/doc/${id}`} className="flex items-center w-full">
                    <p className='flex-grow pl-5 pr-10'>{fileName}</p>
                    <p className="pr-5 text-sm truncate">{`${date
                        ?.toDate()
                        ?.toDateString("en-US")} at ${date
                            ?.toDate()
                            ?.toLocaleTimeString("en-US")}`}</p>
                </Link>
                <Button
                    className="border-0 block"
                    onClick={() => setOpen(true)}
                >
                    <Delete />
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='absolute top-[50%] left-[50%] w-[auto] p-6 border-2 bg-white shadow-lg rounded-xl' style={{ transform: 'translate(-50%, -50%)' }}>
                    <p className='font-light'>Do you really want to delete this document?</p>
                    <div className='flex items-center justify-around mt-5'>
                        <button
                            onClick={() => deleteDocument(id)}
                            className='bg-red-500 text-white px-8 py-2 rounded-xl hover:shadow-2xl hover:bg-red-600'
                        >
                            Yes
                        </button>
                        <button 
                        className='bg-white text-blue-500 px-8 py-2 rounded-xl hover:bg-gray-100' onClick={() => setOpen(false)}>No</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default DocRow