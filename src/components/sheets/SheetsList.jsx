import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import SheetItem from "./SheetItem";
import Loader from "../loader/Loader";

import { sortDocs } from "../../utils/sortFiles";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: ${(props) => (props.viewType === "grid" ? "wrap" : "nowrap")};
  gap: ${(props) => (props.viewType === "grid" ? "1.5rem" : "0")};
  justify-content: ${(props) => (props.viewType === "grid" ? "center" : "flex-start")};
  flex-direction: ${(props) => (props.viewType === "list" ? "column" : "row")};
  width: 100%;
  /* background: var(--color-bg-primary); */
  ${(props) => props.viewType === "list" && "border-top: 1px solid #e5e7eb;"}
`;

const NoResults = styled.div`
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  color: #6b7280;
`;

const SheetsList = ({ searchInput, sortType, sortOrder = "asc", viewType }) => {
    const { user } = useContext(AuthContext);

    const [userSheets, setUserSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(firestore, "userSheets", `${user?.uid}`, "sheets"),
            (snap) => {
                try {
                    setUserSheets(
                        snap.docs?.map((doc) => ({
                            id: doc?.id,
                            ...doc.data(),
                        })) || []
                    );
                } catch (error) {
                    console.error("Error fetching sheets:", error);
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

    const filteredSheets = userSheets.filter((sheet) =>
        sheet.name.toLowerCase().includes((searchInput || "").toLowerCase())
    );

    const sortedSheets = sortDocs(filteredSheets, sortType, sortOrder);
    const noResults = !loading && hasFetched && sortedSheets.length === 0;

    return (
        <Container viewType={viewType}>
            {loading && <Loader type="sheets" />}

            {noResults && <NoResults>No spreadsheets found</NoResults>}

            {!loading &&
                sortedSheets.map((sheet) => (
                    <SheetItem
                        id={sheet.id}
                        key={sheet.id}
                        name={sheet.name}
                        date={sheet.time}
                        viewType={viewType}
                    />
                ))}
        </Container>
    );
};

export default SheetsList;
