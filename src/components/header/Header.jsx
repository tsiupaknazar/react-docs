import styled, { css } from "styled-components";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";

import HeaderContent from "./HeaderContent";
import ThemeToggle from "../common/ThemeToggle";
import CustomModal from "../common/CustomModal";
import Menu from "../common/Menu";
import SidebarMenu from "../common/SidebarMenu";

import { MenuIcon } from "lucide-react";
import Search from "./Search";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  border-bottom: 1px solid rgba(0,0,0,0.04);

  @media (prefers-color-scheme: dark) {
    border-bottom-color: rgba(255,255,255,0.04);
  }
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-right: 8px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;

  &:hover {
    background: rgba(0,0,0,0.04);
  }

  @media (prefers-color-scheme: dark) {
    &:hover { background: rgba(255,255,255,0.03); }
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Status = styled.span`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-right: 6px;
  min-width: 120px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  cursor: pointer;
  object-fit: cover;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${(props) =>
    props.variant === "danger" &&
    css`
      background: #ef4444;
      color: white;

      &:hover {
        background: #dc2626;
      }

      &:active {
        transform: scale(0.98);
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background: transparent;
      color: var(--color-text-accent);
      border: 1px solid rgba(0, 0, 0, 0.06);

      &:hover {
        background: rgba(96, 96, 96, 0.393);
        border-color: rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: scale(0.98);
      }
    `}
`;

const Header = ({ docName, setSearchInput, docId, status }) => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);

  const logout = () => {
    setUser(null);
    signOut(auth).then(() => navigate("/login"));
  };

  const handleSearchChange = (event) => setSearchInput(event.target.value);

  return (
    <>
      <HeaderWrapper>
        <LeftControls>
          <MenuButton
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            title="Toggle menu"
          >
            <MenuIcon size={20} strokeWidth={2} />
          </MenuButton>

          <HeaderContent
            location={location}
            docName={docName}
            handleSearchChange={handleSearchChange}
            docId={docId}
          />
        </LeftControls>

        {(location.pathname === "/" || location.pathname === "/spreadsheets") && (
          <Search handleSearchChange={handleSearchChange} />
        )}

        <RightControls>
          {status && <Status>{status}</Status>}
          <ThemeToggle />
          <Avatar
            src="/default-avatar.png"
            title={user?.displayName}
            alt={user?.displayName || "avatar"}
            onClick={handleMenuOpen}
          />
        </RightControls>
      </HeaderWrapper>

      <SidebarMenu isOpen={sidebarOpen} onClose={closeSidebar} />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        options={[
          {
            label: (
              <div>
                {user?.displayName} <br />
                <span style={{ fontSize: 12 }}>{user?.email}</span>
              </div>
            ),
            onClick: handleMenuClose,
          },
          { label: "Logout", onClick: () => setModalOpen(true), danger: true },
        ]}
        offsetX={-150}
        offsetY={8}
      />

      <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Logout">
        <p style={{ fontWeight: 300 }}>Do you really want to exit?</p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <ModalButton
            onClick={logout}
            variant="danger"
          >
            Yes
          </ModalButton>
          <ModalButton
            onClick={() => setModalOpen(false)}
            variant="secondary"
          >
            No
          </ModalButton>
        </div>
      </CustomModal>
    </>
  );
};

export default Header;