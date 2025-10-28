import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";

import Header from "../components/header/Header";
import DocsList from "../components/docs/DocsList";
import Loader from "../components/loader/Loader";
import CustomModal from "../components/common/CustomModal";
import Dropdown from "../components/common/Dropdown";

import { sortOptions } from "../utils/sortOptions";

import { List, Table } from 'lucide-react';

import { templates } from "../utils/templates";

const Home = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [viewType, setViewType] = useState("grid");

  const [sortType, setSortType] = useState("date-newest");

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createDoc = async () => {
    if (!input) return;
    setInput("");
    setOpen(false);

    const chosenTemplate = templates.find(t => t.id === selectedTemplate);

    const docRef = await addDoc(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      {
        name: `${input}`,
        time: serverTimestamp(),
        content: chosenTemplate ? chosenTemplate.content : "<p></p>",
      }
    );
    navigate(`/doc/${docRef?.id}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return <Loader type="docs" />;
  }

  if (user === null) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <Header setSearchInput={setSearchInput} />
      <section className="bg-primary pb-10 md:px-40 px-10">
        <div className="max-w-screen mx-auto">
          <div className="py-6 flex flex-wrap items-center justify-between">
            <h2 className="text-primary text-xl">Last Documents:</h2>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-2xl hover:bg-blue-600"
              >
                {viewType === "grid" ? <List /> : <Table />}
              </button>
              <Dropdown
                options={sortOptions}
                value={sortType}
                onChange={setSortType}
                placeholder="Sort by..." 
                color="#3b82f6"
                />

              <button
                onClick={handleOpen}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-2xl hover:bg-blue-600"
              >
                Create New
              </button>
            </div>
          </div>
          <DocsList viewType={viewType} searchInput={searchInput} sortType={sortType} sortOrder="desc" />
        </div>
      </section>
      <CustomModal isOpen={open} onClose={handleClose} title="Create Document">
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
          <select
            className="mt-3 p-2 w-full bg-secondary text-primary rounded-lg"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between gap-5 mt-5">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-6 py-2 rounded-xl hover:shadow-2xl hover:bg-blue-600"
            >
              Create
            </button>

            <button
              type="button"
              className="w-full bg-white text-blue-500 px-6 py-2 rounded-xl hover:bg-gray-100"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </CustomModal>

    </div>
  );
};

export default Home;