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
    <div className="w-auto flex flex-wrap gap-6 justify-between border border-red-700">
      {userDoc?.length === 0 ? (
        <div className="w-full text-center py-5">
          No Documents. Create your first document by click on{" "}
          <span className="text-blue-500">Create New</span> button
        </div>
      ) : (
        ""
      )}
      {userDoc?.map((doc) => (
        <DocRow id={doc?.id} key={doc?.id} name={doc?.name} date={doc?.time} />
      ))}
    </div>
  );
};

export default DocsList;
