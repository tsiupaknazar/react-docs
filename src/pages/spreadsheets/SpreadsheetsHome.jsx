import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";

import Header from "../../components/header/Header";
import SheetsList from "../../components/sheets/SheetsList";
import Loader from "../../components/loader/Loader";
import CustomModal from "../../components/common/CustomModal";
import Dropdown from "../../components/common/Dropdown";

import { sortOptions } from "../../utils/sortOptions";
import { List, Table } from "lucide-react";
import styled from "styled-components";

const Section = styled.section`
  background-color: var(--color-bg-primary); /* bg-primary */
  padding-bottom: 2.5rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  min-height: 100%;
  height: 100%;

  @media(min-width: 768px) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  color: var(--color-text-primary);
  font-size: 1.25rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Button = styled.button`
  background-color: ${(props) => props.bg || "#22c55e"};
  color: ${(props) => props.color || "white"};
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.hoverBg || "#16a34a"};
  }
`;

const ModalInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  background-color: #f3f4f6; /* bg-secondary */
  border-radius: 0.5rem;
  outline: none;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: 1.25rem;
`;

const Spreadsheets = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [viewType, setViewType] = useState("grid");
    const [sortType, setSortType] = useState("date-newest");

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createSpreadsheet = async () => {
        if (!input) return;
        setInput("");
        setOpen(false);

        const defaultData = JSON.stringify([[""]]);

        const sheetRef = await addDoc(
            collection(firestore, "userSheets", `${user?.uid}`, "sheets"),
            {
                name: input,
                time: serverTimestamp(),
                content: defaultData,
            }
        );

        navigate(`/sheet/${sheetRef?.id}`);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, []);

    if (loading) return <Loader type="sheets" />;
    if (user === null) {
        navigate("/login");
        return null;
    }

    return (
        <div>
            <Header setSearchInput={setSearchInput} />

            <Section>
                <Container>
                    <HeaderRow>
                        <Title>Last Spreadsheets:</Title>

                        <Actions>
                            <Button
                                onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
                                bg="#22c55e"
                                hoverBg="#16a34a"
                            >
                                {viewType === "grid" ? <List /> : <Table />}
                            </Button>

                            <Dropdown
                                options={sortOptions}
                                value={sortType}
                                onChange={setSortType}
                                placeholder="Sort by..."
                                color="#22c55e"
                            />

                            <Button onClick={handleOpen} bg="#22c55e" hoverBg="#16a34a">
                                Create New
                            </Button>
                        </Actions>
                    </HeaderRow>

                    <SheetsList
                        viewType={viewType}
                        searchInput={searchInput}
                        sortType={sortType}
                        sortOrder="desc"
                    />
                </Container>
            </Section>

            <CustomModal isOpen={open} onClose={handleClose} title="Create Spreadsheet">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createSpreadsheet();
                    }}
                >
                    <ModalInput
                        type="text"
                        placeholder="Enter spreadsheet name..."
                        onChange={({ target }) => setInput(target.value)}
                        value={input}
                    />

                    <ModalButtons>
                        <Button type="submit" bg="#22c55e" hoverBg="#16a34a">
                            Create
                        </Button>

                        <Button type="button" bg="white" color="#22c55e" hoverBg="#f3f4f6" onClick={handleClose}>
                            Cancel
                        </Button>
                    </ModalButtons>
                </form>
            </CustomModal>
        </div>
    );
};

export default Spreadsheets;
