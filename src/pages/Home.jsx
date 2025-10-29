import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";

import Header from "../components/header/Header";
import DocsList from "../components/docs/DocsList";
import Loader from "../components/loader/Loader";
import CustomModal from "../components/common/CustomModal";
import Dropdown from "../components/common/Dropdown";

import { sortOptions } from "../utils/sortOptions";

import { List, Table } from "lucide-react";

import { templates } from "../utils/templates";

const Page = styled.div`
  background: var(--color-bg-primary);
  min-height: 100vh;
`;

const Section = styled.section`
  padding-bottom: 2.5rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;

  @media (min-width: 768px) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
`;

const Inner = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

const Title = styled.h2`
  color: var(--color-text-primary);
  font-size: 1.125rem;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-button);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  gap: 0.5rem;
  font-weight: 600;

  &:hover {
    filter: brightness(0.95);
  }
`;

const PrimaryButton = styled.button`
  background: var(--color-bg-button);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    filter: brightness(0.95);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

const CancelButton = styled.button`
  background: transparent;
  color: var(--color-text-accent);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(0,0,0,0.06);
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,0.03);
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid rgba(0,0,0,0.04);
  color: var(--color-text-primary);
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: 0.5rem;
  border: 1px solid rgba(0,0,0,0.04);
  outline: none;
`;

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

    const chosenTemplate = templates.find((t) => t.id === selectedTemplate);

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
    <Page>
      <Header setSearchInput={setSearchInput} />
      <Section>
        <Inner>
          <HeaderRow>
            <Title>Last Documents:</Title>

            <Actions>
              <IconButton
                onClick={() => setViewType((vt) => (vt === "grid" ? "list" : "grid"))}
                aria-label="Toggle view"
                title="Toggle view"
              >
                {viewType === "grid" ? <List /> : <Table />}
              </IconButton>

              <Dropdown
                options={sortOptions}
                value={sortType}
                onChange={setSortType}
                placeholder="Sort by..."
                color="var(--color-bg-button)"
              />

              <PrimaryButton onClick={handleOpen}>Create New</PrimaryButton>
            </Actions>
          </HeaderRow>

          <DocsList viewType={viewType} searchInput={searchInput} sortType={sortType} sortOrder="desc" />
        </Inner>
      </Section>

      <CustomModal isOpen={open} onClose={handleClose} title="Create Document">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createDoc();
          }}
        >
          <TextInput
            type="text"
            placeholder="Enter doc name..."
            onChange={({ target }) => setInput(target.value)}
            value={input}
          />

          <Select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </Select>

          <ModalButtons>
            <PrimaryButton type="submit">Create</PrimaryButton>

            <CancelButton type="button" onClick={handleClose}>
              Cancel
            </CancelButton>
          </ModalButtons>
        </form>
      </CustomModal>
    </Page>
  );
};

export default Home;