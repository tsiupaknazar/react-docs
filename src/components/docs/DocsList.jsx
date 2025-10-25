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
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      (snap) => {
        try {
          setUserDoc(
            snap.docs?.map((doc) => ({
              id: doc?.id,
              ...doc.data(),
            })) || []
          );
        } catch (error) {
          console.error("Error fetching documents:", error);
        } finally {
          setLoading(false);
          setHasFetched(true);
        }
      },
      (err) => {
        console.error("onSnapshot error:", err);
        setLoading(false);
        setHasFetched(true);
      }
    );
    return () => unsub();
  }, [user?.uid]);

  const filteredDocs = userDoc.filter((doc) =>
    doc.name.toLowerCase().includes((searchInput || "").toLowerCase())
  );

  const sortedDocs = sortDocs(filteredDocs, sortType, sortOrder);

  const noResults = !loading && hasFetched && sortedDocs.length === 0;

  return (
    <div
      className={
        viewType === "grid"
          ? "flex flex-wrap gap-6 sm:justify-normal justify-center"
          : "flex flex-col divide-y"
      }
    >
      {loading && <Loader />}

      {noResults && (
        <div className="w-full py-8 text-center text-gray-500">
          No docs found
        </div>
      )}

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