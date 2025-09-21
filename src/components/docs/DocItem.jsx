import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import { FileText, EllipsisVertical } from 'lucide-react';
import { useNavigate } from "react-router-dom";

import Menu from "../common/Menu";
import CustomModal from "../common/CustomModal";
import DocPreview from "./DocPreview";

const DocItem = ({ id, name, date }) => {
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

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

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
      console.log("Document successfully updated!");
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
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDocContent();
  }, [id, user?.uid]);

  const navigateToDoc = () => {
    navigate(`/doc/${id}`);
  };

  return (
    <>
      <div className="border-2 border-doc hover:border-docHover w-fit rounded-sm mb-10">
        <div
          onClick={navigateToDoc}
          className="relative h-[290px] w-[230px] cursor-pointer flex items-center justify-center"
        >
          <DocPreview content={fileContent} />
        </div>
        <div className="p-4 border-t flex flex-col">
          <p
            onClick={navigateToDoc}
            className="font-bold text-md text-primary cursor-pointer"
          >
            {name || "Filename"}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText style={{ color: "#1A73E8" }} />
              <p className="text-sm text-gray-400 ml-3">
                {date && date.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
            <EllipsisVertical
              className="cursor-pointer p-1"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        options={[
          { label: "Rename Document", onClick: handleRenameModalOpen },
          { label: "Delete Document", onClick: handleDeleteModalOpen, danger: true },
        ]}
        offsetX={-20} // adjust if needed
        offsetY={5}
      />
      <CustomModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        title="Delete Document"
      >
        <p className="font-light text-primary">
          Do you really want to delete this document?
        </p>
        <div className="flex items-center justify-around mt-5">
          <button
            onClick={deleteDocument}
            className="bg-red-500 text-white px-8 py-2 rounded-xl hover:shadow-2xl hover:bg-red-600"
          >
            Yes
          </button>
          <button
            className="bg-white text-blue-500 px-8 py-2 rounded-xl hover:bg-gray-100"
            onClick={() => setDeleteModalOpen(false)}
          >
            No
          </button>
        </div>
      </CustomModal>
      <CustomModal
        isOpen={renameModalOpen}
        onClose={handleRenameModalClose}
        title="Rename Document"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="p-2 w-full bg-secondary rounded-lg outline-none"
            placeholder="Enter name of the document..."
            onChange={handleNameChange}
            value={newName}
          />
          <div className="flex items-center justify-around mt-5">
            <button
              onClick={updateName}
              className={`bg-blue-500 text-white px-6 py-2 rounded-xl hover:shadow-2xl hover:bg-blue-600 ${!newName && "opacity-50 cursor-not-allowed"
                }`}
              disabled={!newName}
            >
              Update
            </button>
            <button
              className="bg-white text-blue-500 px-6 py-2 rounded-xl hover:bg-gray-100"
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

export default DocItem;