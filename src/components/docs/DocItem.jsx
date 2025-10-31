import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import { FileText, EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Menu from "../common/Menu";
import CustomModal from "../common/CustomModal";
import DocPreview from "./DocPreview";
import styled from "styled-components";

const GridCard = styled.div`
  border: 2px solid var(--color-doc);
  &:hover { border-color: var(--color-doc-hover); }
  width: fit-content;
  border-radius: 0.25rem;
  margin-bottom: 2.5rem;
  background: transparent;
`;

const GridPreviewWrapper = styled.div`
  position: relative;
  height: 290px;
  width: 230px;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const CardFooter = styled.div`
  padding: 1rem;
  border-top: 2px solid rgba(255, 255, 255, 0.223);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text-primary);
  margin: 0;
  cursor: pointer;
`;

const MetaRow = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 0.5rem;
`;

const MetaLeft = styled.div`
  display:flex;
  align-items:center;
  gap: 0.75rem;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
`;

const ListRow = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  &:hover { background: var(--color-bg-secondary); cursor: pointer; }
`;

const ListLeft = styled.div`
  display:flex;
  align-items:center;
  gap: 1rem;
`;

const IconButton = styled.div`
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid rgba(0,0,0,0.04);
  color: var(--color-text-primary);
  outline: none;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ActionButton = styled.button`
  background: ${(p) => (p.danger ? "#ef4444" : "white")};
  color: ${(p) => (p.danger ? "white" : "var(--color-text-accent)")};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: ${(p) => (p.danger ? "none" : "1px solid rgba(0,0,0,0.06)")};
  cursor: pointer;
  width: 50%;

  &:hover {
    background: ${(p) => (p.danger ? "#ff0000" : "var(--color-bg-button)")};
    color: ${(p) => (p.danger ? "white" : "white")};
  }
`;

const DocItem = ({ id, name, date, viewType }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [newName, setNewName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", id);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleRenameModalOpen = () => {
    setNewName(name);
    setRenameModalOpen(true);
  };
  const handleRenameModalClose = () => setRenameModalOpen(false);

  const handleNameChange = (e) => setNewName(e.target.value);

  const deleteDocument = async () => {
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  };

  const updateName = async () => {
    try {
      await updateDoc(docRef, { name: newName });
      handleRenameModalClose();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    const getDocContent = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const content = docSnap.data().content;
          setFileContent(content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.uid) getDocContent();
  }, [id, user?.uid]);

  const navigateToDoc = () => navigate(`/doc/${id}`);

  return (
    <>
      {viewType === "grid" && (
        <GridCard>
          <GridPreviewWrapper onClick={navigateToDoc}>
            <DocPreview content={fileContent} />
          </GridPreviewWrapper>

          <CardFooter>
            <Title onClick={navigateToDoc}>{name || "Filename"}</Title>
            <MetaRow>
              <MetaLeft>
                <FileText style={{ color: "#1A73E8" }} />
                <span>
                  {date && date.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </MetaLeft>
              <IconButton onClick={handleClick}>
                <EllipsisVertical />
              </IconButton>
            </MetaRow>
          </CardFooter>
        </GridCard>
      )}

      {viewType === "list" && (
        <ListRow onClick={navigateToDoc}>
          <ListLeft>
            <FileText style={{ color: "#1A73E8" }} />
            <Title>{name || "Filename"}</Title>
          </ListLeft>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
              {date && date.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </div>
            <IconButton style={{color: "var(--color-text-primary)"}} onClick={(e) => { e.stopPropagation(); handleClick(e); }}>
              <EllipsisVertical stroke="var(--color-text-primary)"/>
            </IconButton>
          </div>
        </ListRow>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        options={[
          { label: "Rename Document", onClick: handleRenameModalOpen },
          { label: "Delete Document", onClick: handleDeleteModalOpen, danger: true },
        ]}
        offsetX={-20}
        offsetY={5}
      />

      <CustomModal isOpen={deleteModalOpen} onClose={handleDeleteModalClose} title="Delete Document">
        <p style={{ fontWeight: 300, color: "var(--color-text-primary)" }}>
          Do you really want to delete this document?
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <ActionButton danger onClick={deleteDocument}>Yes</ActionButton>
          <ActionButton onClick={() => setDeleteModalOpen(false)}>No</ActionButton>
        </div>
      </CustomModal>

      <CustomModal isOpen={renameModalOpen} onClose={handleRenameModalClose} title="Rename Document">
        <form onSubmit={(e) => { e.preventDefault(); updateName(); }}>
          <Input
            type="text"
            placeholder="Enter name of the document..."
            onChange={handleNameChange}
            value={newName}
          />
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <ActionButton onClick={updateName} disabled={!newName} style={{ opacity: !newName ? 0.6 : 1 }}>
              Update
            </ActionButton>
            <ActionButton danger onClick={handleRenameModalClose}>Cancel</ActionButton>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default DocItem;