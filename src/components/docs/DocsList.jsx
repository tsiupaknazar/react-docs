import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import DocItem from "./DocItem";
import Loader from "../loader/Loader";

import { sortDocs } from "../../utils/sortFiles";
import styled from "styled-components";

const Container = styled.div`
  display: ${(p) => (p.viewType === "grid" ? "grid" : "block")};
  width: 100%;

  grid-template-columns: ${(p) =>
    p.viewType === "grid"
      ? "repeat(auto-fit, minmax(250px, 1fr))"
      : "none"};
  gap: ${(p) => (p.viewType === "grid" ? "1.5rem" : "0")};

  justify-content: ${(p) => (p.viewType === "grid" ? "center" : "unset")};
  justify-items: stretch;

  @media (max-width: 500px) {
    grid-template-columns: ${(p) =>
      p.viewType === "grid" ? "1fr" : "none"};
    gap: ${(p) => (p.viewType === "grid" ? "1rem" : "0")};
  }
`;




const Empty = styled.div`
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  color: var(--color-text-secondary);
`;

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
    <Container viewType={viewType}>
      {loading && <Loader />}

      {noResults && <Empty>No docs found</Empty>}

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
    </Container>
  );
};

export default DocsList;