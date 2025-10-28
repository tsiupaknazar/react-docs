// import { MenuItem, Menu, Divider, Modal, Box } from "@mui/material";
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
      <header className="sticky top-0 z-40 bg-primary shadow-md min-w-full flex items-center justify-between py-4 px-8 dark:border-b-2">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          className="p-1 mr-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MenuIcon size={20} strokeWidth={2} />
        </button>
        <HeaderContent
          location={location}
          docName={docName}
          handleSearchChange={handleSearchChange}
          docId={docId}
        />
        <div className="flex items-center justify-between">
          {status && <span className="flex-1 w-full text-sm text-secondary">{status}</span>}
          <ThemeToggle />
          <img
            src={'/default-avatar.png'}
            title={user?.displayName}
            className="cursor-pointer h-8 w-8 rounded-full ml-2"
            onClick={handleMenuOpen}
          />
        </div>
      </header>

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
                <span className="text-xs">{user?.email}</span>
              </div>
            ),
            onClick: handleMenuClose,
          },
          { label: "Logout", onClick: () => setModalOpen(true), danger: true },
        ]}
        offsetX={-150}
        offsetY={8}
      />


      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Logout"
      >
        <p className="font-light">Do you really want to exit?</p>
        <div className="flex items-center justify-between gap-5 mt-5">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-primary px-8 py-2 rounded-xl hover:shadow-2xl hover:bg-red-600"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="w-full bg-secondary text-blue-500 px-8 py-2 rounded-xl hover:bg-primary"
          >
            No
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default Header;