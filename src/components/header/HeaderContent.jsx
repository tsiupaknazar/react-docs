import { Link } from "react-router-dom";
import { FileText } from 'lucide-react';
import Search from "./Search";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../common/CustomToast";
import { ThemeContext } from "../../context/ThemeContext";

const HeaderContent = ({
  location,
  docName,
  handleSearchChange,
  docId
}) => {
  const { user } = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

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
      // toast.error("Error updating document name");
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
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-center">
        <Link to="/">
          <FileText size={40} className="cursor-pointer" color="#4385F3" />
        </Link>
        {location.pathname === "/" ? (
          <h1 className="ml-2 text-primary text-2xl hidden md:inline-flex">Docs</h1>
        ) : editing ? (
          <input
            className="ml-2 text-primary text-2xl border-b outline-none bg-transparent"
            value={newName}
            autoFocus
            onChange={e => setNewName(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
          />
        ) : (
          <h1
            className="ml-2 text-primary text-2xl md:inline-flex"
            onDoubleClick={handleDoubleClick}
            title="Double-click to rename"
          >
            {docName || null}
          </h1>
        )}
      </div>
      {location.pathname === "/" && (
        <Search handleSearchChange={handleSearchChange} />
      )}
      <ToastContainer
        hideProgressBar={true}
        closeOnClick
        theme={theme}
      />
    </div>
  );
};

export default HeaderContent;
