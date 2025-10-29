import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FileText } from "lucide-react";
import Loader from "../components/loader/Loader";
import styled from "styled-components";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary, #fff);
  color: var(--color-text-primary, #111827);
  padding: 2rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  text-align: center;
`;

const BrandIcon = styled.div`
  display: block;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 3rem;
  margin: 0;
  color: inherit;
`;

const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--color-bg-button, #2563EB);
  color: var(--btn-text, #fff);
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(2,6,23,0.08);
  transition: transform 120ms ease, filter 120ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 3px solid rgba(59,130,246,0.16);
    outline-offset: 2px;
  }
`;

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
      <Page>
        <Card>
          <BrandIcon>
            <FileText size={200} color="#4385F3" aria-hidden />
          </BrandIcon>

          <Title>React Docs</Title>

          <LoginButton onClick={login} aria-label="Login with Google">
            <span>Login with Google</span>
          </LoginButton>
        </Card>
      </Page>
    </>
  );
};

export default Login;