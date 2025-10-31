import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";

import Header from "../../components/header/Header";
import DocsList from "../../components/docs/DocsList";
import Loader from "../../components/loader/Loader";
import CustomModal from "../../components/common/CustomModal";
import Dropdown from "../../components/common/Dropdown";

import { sortOptions } from "../../utils/sortOptions";

import { List, Table } from "lucide-react";

import { templates } from "../../utils/templates";

import * as S from "./Home.styled";

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
    const chosenTemplate = templates.find((t) => t.id === selectedTemplate);

    const docRef = await addDoc(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      {
        name: input,
        time: serverTimestamp(),
        content: chosenTemplate ? chosenTemplate.content : "<p></p>",
      }
    );

    setInput("");
    setOpen(false);
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
    <S.Page>
      <Header setSearchInput={setSearchInput} />
      <S.Section>
        <S.Inner>
          <S.HeaderRow>
            <S.Title>Last Documents:</S.Title>

            <S.Actions>
              <S.IconButton
                onClick={() => setViewType((vt) => (vt === "grid" ? "list" : "grid"))}
                aria-label="Toggle view"
                title="Toggle view"
              >
                {viewType === "grid" ? <List /> : <Table />}
              </S.IconButton>

              <Dropdown
                options={sortOptions}
                value={sortType}
                onChange={setSortType}
                placeholder="Sort by..."
                color="var(--color-bg-button)"
              />

              <S.CreateButton onClick={handleOpen}>Create New</S.CreateButton>
            </S.Actions>
          </S.HeaderRow>

          <DocsList viewType={viewType} searchInput={searchInput} sortType={sortType} sortOrder="desc" />
        </S.Inner>
      </S.Section>

      <CustomModal isOpen={open} onClose={handleClose} title="Create Document">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createDoc();
          }}
        >
          <S.TextInput
            type="text"
            placeholder="Enter doc name..."
            onChange={({ target }) => setInput(target.value)}
            value={input}
          />

          <S.Select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </S.Select>

          <S.ModalButtons>
            <S.ActionButton type="submit">Create</S.ActionButton>

            <S.ActionButton danger type="button" onClick={handleClose}>
              Cancel
            </S.ActionButton>
          </S.ModalButtons>
        </form>
      </CustomModal>
    </S.Page>
  );
};

export default Home;