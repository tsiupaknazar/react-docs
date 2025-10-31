import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth, firestore } from "../../firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FileText } from "lucide-react";
import Loader from "../../components/loader/Loader";

import * as S from "./Login.styled";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/");
    }
  });

  const login = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const docRef = doc(firestore, "users", `${user?.uid}`);
        setDoc(
          docRef,
          {
            lastLogin: serverTimestamp,
            name: user?.displayName,
            email: user?.email,
            number: user?.phoneNumber,
          },
          { merge: true },
          (doc) => console.log(doc)
        );
        setUser(user);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <Loader type="docs" />}
      <S.Page>
        <S.Card>
          <S.BrandIcon>
            <FileText size={200} color="#4385F3" aria-hidden />
          </S.BrandIcon>

          <S.Title>React Docs</S.Title>

          <S.LoginButton onClick={login} aria-label="Login with Google">
            <span>Login with Google</span>
          </S.LoginButton>
        </S.Card>
      </S.Page>
    </>
  );
};

export default Login;