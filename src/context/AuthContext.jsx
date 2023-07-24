import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      setUser(res);
      setLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
