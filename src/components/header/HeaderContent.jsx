import { Link } from "react-router-dom";
import { Description } from "@mui/icons-material";
import Search from "./Search";
import PropTypes from "prop-types";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const HeaderContent = ({
  location,
  docName,
  handleSearchChange,
  docId
}) => {
  const { user } = useContext(AuthContext);

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
      toast.error("Error updating document name");
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
          <Description
            sx={{
              color: "#4385F3",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
            alt="Home"
          />
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
      <ToastContainer />
    </div>
  );
};

HeaderContent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  docName: PropTypes.string,
  handleSearchChange: PropTypes.func,
  handleSave: PropTypes.func,
  docId: PropTypes.string,
};

export default HeaderContent;
