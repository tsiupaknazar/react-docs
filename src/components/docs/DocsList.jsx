import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import DocItem from "./DocItem";
import Loader from "../loader/Loader";

import { sortDocs } from "../../utils/sortDocs";

const DocsList = ({ searchInput, sortType, sortOrder = "asc", viewType }) => {
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

  const sortedDocs = sortDocs(filteredDocs, sortType, sortOrder);

  return (
    <div className={
      viewType === "grid"
        ? "flex flex-wrap gap-6 sm:justify-normal justify-center"
        : "flex flex-col divide-y"
    }>
      {loading && <Loader />}
      {!loading &&
        sortedDocs.map((doc) => (
          <DocItem
            id={doc.id}
            key={doc.id}
            name={doc.name}
            date={doc.time}
            viewType={viewType}
          />
        ))}
    </div>
  );
};

export default DocsList;