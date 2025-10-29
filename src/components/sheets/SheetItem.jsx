import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import { FileSpreadsheet, EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Menu from "../common/Menu";
import CustomModal from "../common/CustomModal";
import styled from "styled-components";

const GridContainer = styled.div`
  border: 2px solid #22c55e;
  width: fit-content;
  border-radius: 0.125rem;
  margin-bottom: 2.5rem;
  &:hover {
    border-color: #16a34a;
  }
`;

const GridContent = styled.div`
  position: relative;
  height: 200px;
  width: 230px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const GridFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
`;

const NameText = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: var(--color-text-primary);
  cursor: pointer;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoLeft = styled.div`
  display: flex;
  align-items: center;
`;

const DateText = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
  margin-left: 0.75rem;
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const ListLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ListRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.bg || "white"};
  color: ${(props) => props.color || "#22c55e"};
  padding: 0.5rem 2rem;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    box-shadow: ${(props) => (props.hoverShadow ? "0 10px 20px rgba(0,0,0,0.2)" : "none")};
    background-color: ${(props) => props.hoverBg || props.bg};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  outline: none;
`;

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
                <GridContainer>
                    <GridContent onClick={navigateToSheet}>
                        <FileSpreadsheet size={48} color="#22c55e" />
                        <DateText>
                            {sheetContent?.length > 0 ? "Spreadsheet" : "Empty Sheet"}
                        </DateText>
                    </GridContent>
                    <GridFooter>
                        <NameText onClick={navigateToSheet}>{name || "Untitled Sheet"}</NameText>
                        <InfoRow>
                            <InfoLeft>
                                <FileSpreadsheet color="#22c55e" />
                                <DateText>
                                    {date?.toDate().toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </DateText>
                            </InfoLeft>
                            <EllipsisVertical onClick={handleClick} style={{ cursor: "pointer", padding: "0.25rem" }} />
                        </InfoRow>
                    </GridFooter>
                </GridContainer>
            )}

            {viewType === "list" && (
                <ListContainer>
                    <ListLeft onClick={navigateToSheet}>
                        <FileSpreadsheet color="#22c55e" />
                        <NameText>{name || "Untitled Sheet"}</NameText>
                    </ListLeft>
                    <ListRight>
                        <DateText>
                            {date?.toDate().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </DateText>
                        <EllipsisVertical onClick={handleClick} style={{ cursor: "pointer", padding: "0.25rem" }} />
                    </ListRight>
                </ListContainer>
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
            <CustomModal isOpen={deleteModalOpen} onClose={handleDeleteModalClose} title="Delete Spreadsheet">
                <p style={{ fontWeight: 300, color: "#1a73e8" }}>Do you really want to delete this spreadsheet?</p>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1.25rem" }}>
                    <Button bg="#ef4444" color="white" hoverBg="#dc2626" hoverShadow onClick={deleteSheet}>
                        Yes
                    </Button>
                    <Button bg="white" color="#22c55e" hoverBg="#f3f4f6" onClick={handleDeleteModalClose}>
                        No
                    </Button>
                </div>
            </CustomModal>

            {/* Rename modal */}
            <CustomModal isOpen={renameModalOpen} onClose={handleRenameModalClose} title="Rename Spreadsheet">
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="text"
                        placeholder="Enter new spreadsheet name..."
                        onChange={handleNameChange}
                        value={newName}
                    />
                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1.25rem" }}>
                        <Button
                            bg="#22c55e"
                            color="white"
                            hoverBg="#16a34a"
                            hoverShadow
                            disabled={!newName}
                            onClick={updateName}
                        >
                            Update
                        </Button>
                        <Button bg="white" color="#22c55e" hoverBg="#f3f4f6" onClick={handleRenameModalClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </CustomModal>
        </>
    );
};

export default SheetItem;
