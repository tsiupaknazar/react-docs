import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import SheetItem from "./SheetItem";
import Loader from "../loader/Loader";

import { sortDocs } from "../../utils/sortDocs";
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
        <div
            className={
                viewType === "grid"
                    ? "flex flex-wrap gap-6 sm:justify-normal justify-center"
                    : "flex flex-col divide-y"
            }
        >
            {loading && <Loader type="sheets" />}

            {noResults && (
                <div className="w-full py-8 text-center text-gray-500">
                    No spreadsheets found
                </div>
            )}

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
        </div>
    );
};

export default SheetsList;
