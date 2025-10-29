import { Link } from "react-router-dom";
import { FileText, FileSpreadsheet } from "lucide-react";
import Search from "./Search";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../common/CustomToast";
import { ThemeContext } from "../../context/ThemeContext";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: var(--color-bg-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin-left: 0.5rem;
  color: var(--color-text-primary);
  font-size: 1.5rem;
  display: none;

  @media(min-width: 768px) {
    display: inline-flex;
  }

  cursor: ${(props) => (props.editable ? "pointer" : "default")};
`;

const EditableInput = styled.input`
  margin-left: 0.5rem;
  font-size: 1.5rem;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-text-primary);
  outline: none;
`;

const HeaderContent = ({ location, docName, handleSearchChange, docId }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const docRef = user?.uid && docId
    ? doc(firestore, "userDocs", `${user.uid}`, "docs", docId)
    : null;

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(docName);

  const updateName = async (name) => {
    if (!docRef) return;
    try {
      await updateDoc(docRef, { name });
    } catch (error) {
      console.error("Error updating document: ", error);
      toast(<CustomToast title="Error" message="Error updating document name" />);
    }
  };

  const handleDoubleClick = () => {
    setEditing(true);
    setNewName(docName);
  };

  const handleInputBlur = async () => {
    if (newName && newName.trim() !== "" && newName !== docName) {
      await updateName(newName.trim());
    }
    setEditing(false);
  };

  const handleInputKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleInputBlur();
    } else if (e.key === "Escape") {
      setEditing(false);
    }
  };

  return (
    <HeaderWrapper>
      <LeftSection>
        {location.pathname === "/" || location.pathname.includes("doc") ? (
          <Link to="/">
            <FileText size={40} style={{ cursor: "pointer", color: "#4385F3" }} />
          </Link>
        ) : (
          <Link to="/spreadsheets">
            <FileSpreadsheet size={40} style={{ cursor: "pointer", color: "#2bff00" }} />
          </Link>
        )}

        {location.pathname === "/" ? (
          <Title>Docs</Title>
        ) : location.pathname === "/spreadsheets" ? (
          <Title>Sheets</Title>
        ) : editing ? (
          <EditableInput
            value={newName}
            autoFocus
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
          />
        ) : (
          <Title editable onDoubleClick={handleDoubleClick} title="Double-click to rename">
            {docName || null}
          </Title>
        )}
      </LeftSection>

      {(location.pathname === "/" || location.pathname === "/spreadsheets") && (
        <Search handleSearchChange={handleSearchChange} />
      )}

      <ToastContainer hideProgressBar={true} closeOnClick theme={theme} />
    </HeaderWrapper>
  );
};

export default HeaderContent;
