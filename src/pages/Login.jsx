import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Description, Google } from "@mui/icons-material";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) navigate("/");
  });

  const login = () => {
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
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center h-100 min-h-screen">
      <Description sx={{ color: "#4385F3", width: "200px", height: "200px" }} />
      <h1 className="font-bold text-5xl mb-5">React Docs</h1>
      <button
        className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:shadow-2xl hover:bg-blue-600 flex items-center justify-between"
        onClick={login}
      >
        <Google />
        <span className="ml-2">Login with Google</span>
      </button>
    </div>
  );
};

export default Login;
