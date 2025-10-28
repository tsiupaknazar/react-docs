import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import { FileSpreadsheet, EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Menu from "../common/Menu";
import CustomModal from "../common/CustomModal";

const SheetItem = ({ id, name, date, viewType }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [newName, setNewName] = useState("");
    const [sheetContent, setSheetContent] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [renameModalOpen, setRenameModalOpen] = useState(false);

    const sheetRef = doc(firestore, "userSheets", `${user?.uid}`, "sheets", id);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleDeleteModalOpen = () => setDeleteModalOpen(true);
    const handleDeleteModalClose = () => setDeleteModalOpen(false);

    const handleRenameModalOpen = () => {
        setNewName(name);
        setRenameModalOpen(true);
    };
    const handleRenameModalClose = () => setRenameModalOpen(false);

    const handleNameChange = (e) => setNewName(e.target.value);

    const deleteSheet = async () => {
        try {
            await deleteDoc(sheetRef);
        } catch (error) {
            console.error("Error deleting sheet:", error);
        }
    };

    const updateName = async () => {
        try {
            await updateDoc(sheetRef, { name: newName });
            handleRenameModalClose();
        } catch (error) {
            console.error("Error renaming sheet:", error);
        }
    };

    useEffect(() => {
        const fetchSheetContent = async () => {
            try {
                const snap = await getDoc(sheetRef);
                if (snap.exists()) {
                    setSheetContent(snap.data().content || []);
                }
            } catch (error) {
                console.error("Error fetching sheet content:", error);
            }
        };
        fetchSheetContent();
    }, [id, user?.uid]);

    const navigateToSheet = () => navigate(`/sheet/${id}`);

    return (
        <>
            {viewType === "grid" && (
                <div className="border-2 border-green-500 hover:border-green-600 w-fit rounded-sm mb-10">
                    <div
                        onClick={navigateToSheet}
                        className="relative h-[200px] w-[230px] cursor-pointer flex flex-col items-center justify-center bg-white"
                    >
                        <FileSpreadsheet size={48} color="#22c55e" />
                        <p className="text-sm text-gray-500 mt-3">
                            {sheetContent?.length > 0 ? "Spreadsheet" : "Empty Sheet"}
                        </p>
                    </div>
                    <div className="p-4 border-t flex flex-col">
                        <p
                            onClick={navigateToSheet}
                            className="font-bold text-md text-primary cursor-pointer"
                        >
                            {name || "Untitled Sheet"}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileSpreadsheet style={{ color: "#22c55e" }} />
                                <p className="text-sm text-gray-400 ml-3">
                                    {date &&
                                        date.toDate().toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                </p>
                            </div>
                            <EllipsisVertical
                                className="cursor-pointer p-1"
                                onClick={handleClick}
                            />
                        </div>
                    </div>
                </div>
            )}

            {viewType === "list" && (
                <div className="flex items-center justify-between p-4 border-b hover:bg-secondary cursor-pointer">
                    <div className="flex items-center gap-4" onClick={navigateToSheet}>
                        <FileSpreadsheet style={{ color: "#22c55e" }} />
                        <p
                            onClick={navigateToSheet}
                            className="font-bold text-md text-primary cursor-pointer"
                        >
                            {name || "Untitled Sheet"}
                        </p>
                    </div>
                    <div className="flex items-center md:gap-32 gap-10">
                        <p className="text-sm text-gray-400 ml-3">
                            {date &&
                                date.toDate().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                        </p>
                        <EllipsisVertical
                            className="cursor-pointer p-1"
                            onClick={handleClick}
                        />
                    </div>
                </div>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                options={[
                    { label: "Rename Spreadsheet", onClick: handleRenameModalOpen },
                    { label: "Delete Spreadsheet", onClick: handleDeleteModalOpen, danger: true },
                ]}
                offsetX={-20}
                offsetY={5}
            />

            {/* Delete confirmation modal */}
            <CustomModal
                isOpen={deleteModalOpen}
                onClose={handleDeleteModalClose}
                title="Delete Spreadsheet"
            >
                <p className="font-light text-primary">
                    Do you really want to delete this spreadsheet?
                </p>
                <div className="flex items-center justify-around mt-5">
                    <button
                        onClick={deleteSheet}
                        className="bg-red-500 text-white px-8 py-2 rounded-xl hover:shadow-2xl hover:bg-red-600"
                    >
                        Yes
                    </button>
                    <button
                        className="bg-white text-green-500 px-8 py-2 rounded-xl hover:bg-gray-100"
                        onClick={() => setDeleteModalOpen(false)}
                    >
                        No
                    </button>
                </div>
            </CustomModal>

            {/* Rename modal */}
            <CustomModal
                isOpen={renameModalOpen}
                onClose={handleRenameModalClose}
                title="Rename Spreadsheet"
            >
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        className="p-2 w-full bg-secondary rounded-lg outline-none"
                        placeholder="Enter new spreadsheet name..."
                        onChange={handleNameChange}
                        value={newName}
                    />
                    <div className="flex items-center justify-around mt-5">
                        <button
                            onClick={updateName}
                            className={`bg-green-500 text-white px-6 py-2 rounded-xl hover:shadow-2xl hover:bg-green-600 ${!newName && "opacity-50 cursor-not-allowed"
                                }`}
                            disabled={!newName}
                        >
                            Update
                        </button>
                        <button
                            className="bg-white text-green-500 px-6 py-2 rounded-xl hover:bg-gray-100"
                            onClick={handleRenameModalClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </CustomModal>
        </>
    );
};

export default SheetItem;
