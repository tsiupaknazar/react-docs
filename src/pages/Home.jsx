import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { firestore } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";

import Header from "../components/header/Header";
import DocsList from "../components/docs/DocsList";

const Home = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createDoc = async () => {
    if (!input) return;
    setInput("");
    setOpen(false);

    const docRef = await addDoc(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      {
        name: `${input}`,
        time: serverTimestamp(),
      }
    );
    navigate(`/doc/${docRef?.id}`);
  };

  return (
    <div>
      <Header setSearchInput={setSearchInput} />
      <section className="bg-primary pb-10 md:px-40 px-10">
        <div className="max-w-screen mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-primary text-xl">Last Documents:</h2>
            <button
              onClick={handleOpen}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-2xl hover:bg-blue-600"
            >
              Create New
            </button>
          </div>
          <DocsList searchInput={searchInput} />
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute top-[50%] left-[50%] w-[300px] p-10 bg-primary shadow-lg rounded-xl"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createDoc();
            }}
          >
            <input
              type="text"
              className="p-2 w-full bg-secondary rounded-lg outline-none"
              placeholder="Enter doc name..."
              onChange={({ target }) => setInput(target.value)}
              value={input}
            />
            <div className="flex items-center justify-between mt-5">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:shadow-2xl hover:bg-blue-600">
                Create
              </button>
              <button
                className="bg-white text-blue-500 px-6 py-2 rounded-xl hover:bg-gray-100"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
