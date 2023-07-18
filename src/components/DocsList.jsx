import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

import DocRow from "./DocRow";

const DocsList = () => {
  const { user } = useContext(AuthContext);

  const [userDoc, setUserDoc] = useState([]);

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
    <div className="w-auto flex flex-col md:flex-row md:flex-wrap gap-6 border border-red-700">
      {/* {userDoc.length === 0 ? (
        <div className="w-full text-center py-5">No Documents</div>
      ) : (
        ""
      )} */}
      {userDoc?.map((doc) => (
        <DocRow
          id={doc?.id}
          key={doc?.id}
          name={doc?.name}
          date={doc?.time}
        />
      ))}
    </div>
  );
};

export default DocsList;
