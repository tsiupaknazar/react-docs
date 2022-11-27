import { Description, Search } from '@mui/icons-material'
import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'
import { Box, Modal } from '@mui/material';

const Header = () => {
    const { user, setUser } = useContext(AuthContext)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    return (
        <>
            <header className='sticky gap-2 top-0 z-50 bg-white shadow-md w-100 flex items-center py-6 px-9'>
                <div className='flex items-center justify-center cursor-pointer'>
                    <Description sx={{ color: '#4385F3', width: '40px', height: '40px' }} />
                    <h1 className='hidden md:inline-flex ml-2 text-gray-700 text-2xl'>Docs</h1>
                </div>
                <div className='md:mx-20 mx-8 w-full flex-shrink flex md:flex-grow items-center px-5 py-3 bg-gray-100 rounded-xl focus-within:text-gray-600 focus-within:shadow-nd'>
                    <Search />
                    <input
                        type="text"
                        placeholder='Search...'
                        className='text-gray-600 bg-transparent outline-none md:px-5 px-2 border-0 md: flex-grow text-base'
                    />
                </div>
                <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    title={user?.displayName}
                    className="cursor-pointer h-10 w-10 rounded-full"
                    onClick={() => {
                        setOpen(true);
                    }}
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
        </>
    )
}

export default Header