import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

import { Article, MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, Modal, Box, Select, MenuItem, Menu } from "@mui/material";

const DocRow = ({ id, name, date }) => {
  //Rename doc state
  const [newName, setNewName] = useState("");

  const { user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const handleRenameModalOpen = () => setRenameModalOpen(true);
  const handleRenameModalClose = () => setRenameModalOpen(false);

  const deleteDocument = async (id) => {
    try {
      const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", id);
      if (docRef) {
        deleteDoc(docRef);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateName = async (id) => {
    try {
      const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", id);
      updateDoc(docRef, { name: `${newName}` }).then(() => {
        console.log("Document successfully updated!");
      });
      handleRenameModalClose();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <>
      <div className="border-2 border-doc hover:border-docHover w-fit rounded-sm mb-10">
        <div className="relative h-[290px] w-[230px] cursor-pointer">
          <Link to={`/doc/${id}`}></Link>
        </div>
        <div className="p-4 border-t flex flex-col">
          <Link to={`/doc/${id}`} className="font-bold text-md text-primary">
            {name || "Filename"}
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Article style={{ color: "#1A73E8" }} />
              <p className="text-sm text-gray-400 ml-3">
                {date ? date.toDate().toLocaleDateString() : "date"}
              </p>
            </div>
            <MoreVert
              className="cursor-pointer p-1"
              sx={{ fontSize: 30 }}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleRenameModalOpen}>Rename Document</MenuItem>
        <MenuItem onClick={handleDeleteModalOpen}>Delete Document</MenuItem>
      </Menu>
      <Modal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute top-[50%] left-[50%] w-[auto] p-6 bg-primary shadow-lg rounded-xl"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <p className="font-light text-primary">
            Do you really want to delete this document?
          </p>
          <div className="flex items-center justify-around mt-5">
            <button
              onClick={() => deleteDocument(id)}
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
        </Box>
      </Modal>
      <Modal
        open={renameModalOpen}
        onClose={handleRenameModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute top-[50%] left-[50%] w-[300px] p-8 bg-primary shadow-lg rounded-xl"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="p-2 w-full bg-secondary rounded-lg outline-none"
              placeholder="Enter name of the document..."
              onChange={({ target }) => setNewName(target.value)}
              value={newName}
            />
            <div className="flex items-center justify-around mt-5">
              <button onClick={() => updateName(id)} className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:shadow-2xl hover:bg-blue-600">
                Create
              </button>
              <button
                className="bg-white text-blue-500 px-6 py-2 rounded-xl hover:bg-gray-100"
                onClick={handleRenameModalClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default DocRow;
