import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import DocItem from "./DocItem";
import Loader from "../loader/Loader";

const DocsList = ({ searchInput }) => {
  const { user } = useContext(AuthContext);

  const [userDoc, setUserDoc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      (snap) => {
        try {
          setUserDoc(
            snap.docs?.map((doc) => ({
              id: doc?.id,
              ...doc.data(),
            }))
          );
        } catch (error) {
          console.error("Error fetching documents:", error);
        } finally {
          setLoading(false);
        }
      }
    );
    return () => unsub();
  }, [user?.uid]);

  const filteredDocs = userDoc.filter((doc) =>
    doc.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-6 sm:justify-normal justify-center">
      {loading && <Loader />}
      {!loading && userDoc.length === 0 && (
        <div className="w-full text-center py-5">
          No Documents. Create your first document by clicking{" "}
          <span className="text-blue-500">Create New</span> button
        </div>
      )}
      {!loading && filteredDocs.length === 0 && userDoc.length > 0 && (
        <div className="w-full text-center py-5">
          No Documents found. Try another search
        </div>
      )}
      {!loading &&
        filteredDocs.map((doc) => (
          <DocItem
            id={doc.id}
            key={doc.id}
            name={doc.name}
            date={doc.time}
          />
        ))}
    </div>
  );
};

export default DocsList;