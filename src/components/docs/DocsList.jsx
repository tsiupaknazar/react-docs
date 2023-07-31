import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import PropTypes from "prop-types";

import DocRow from "./DocRow";

const DocsList = ({ searchInput }) => {
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

  const filteredDocs = userDoc.filter((doc) =>
    doc.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-6 sm:justify-normal justify-center">
      {userDoc?.length === 0 && (
        <div className="w-full text-center py-5">
          No Documents. Create your first document by click on{" "}
          <span className="text-blue-500">Create New</span> button
        </div>
      )}
      {filteredDocs?.length === 0 && userDoc?.length > 0?  (
        <div className="w-full text-center py-5">
          No Documents found. Try another search
        </div>
      ) : (
        ""
      )}
      {filteredDocs?.map((doc) => (
        <DocRow id={doc?.id} key={doc?.id} name={doc?.name} date={doc?.time} />
      ))}
    </div>
  );
};

export default DocsList;

DocsList.propTypes = {
  searchInput: PropTypes.string,
}
