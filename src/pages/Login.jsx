import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, firestore } from '../firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) navigate("/");
  })

  const login = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const docRef = doc(firestore, "users", `${user?.uid}`);
        setDoc(docRef, {
          lastLogin: serverTimestamp(),
          name: user?.displayName,
          email: user?.email,
          number: user?.phoneNumber,
        },
          { merge: true },
          (doc) => console.log(doc)
        );
        console.log(user);
        setUser(user);
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='flex flex-col items-center justify-center h-100 min-h-screen'>
      <img
        src="https://links.papareact.com/1ui"
        height={300}
        width={500}
        alt='logo'
      />
      <Button className='w-44 mt-10' variant='contained' onClick={login}>Login</Button>
    </div>
  )
}

export default Login