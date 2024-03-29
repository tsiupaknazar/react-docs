import { MenuItem, Menu, Divider, Modal, Box } from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";
import PropTypes from "prop-types";

import HeaderContent from "./HeaderContent";
import ThemeToggle from "../common/ThemeToggle";

const Header = ({ docName, handleSave, setSearchInput }) => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const navigate = useNavigate();

  const logout = () => {
    setUser(null); // Update user state to null
    signOut(auth).then(() => {
      navigate("/login"); // Navigate to the login page after logout
    });
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };
  return (
    <>
      <header className="sticky gap-2 top-0 z-40 bg-primary shadow-md w-100 flex items-center justify-between py-6 px-8">
        <HeaderContent
          location={location}
          docName={docName}
          handleSearchChange={handleSearchChange}
          handleSave={handleSave}
        />
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            title={user?.displayName}
            className="cursor-pointer h-10 w-10 rounded-full ml-2"
            onClick={handleClick}
          />
        </div>
      </header>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "var(--color-bg-primary)",
            color: "var(--color-text-primary)",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "var(--color-bg-primary)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <p className="py-1 px-4 text-base break-words font-manrope font-normal leading-5 tracking-wide">
            {user?.displayName ? user?.displayName : "User account"} <br />{" "}
            <span className="text-xs">{user?.email}</span>
          </p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleModalOpen}>Logout</MenuItem>
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute top-[50%] left-[50%] w-[auto] p-10 bg-primary shadow-lg rounded-xl"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <p className="font-light">Do you really want to exit?</p>
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => logout()}
              className="bg-red-500 text-white px-8 py-2 rounded-xl hover:shadow-2xl hover:bg-red-600"
            >
              Yes
            </button>
            <button
              className="bg-white text-blue-500 px-8 py-2 rounded-xl hover:bg-gray-100"
              onClick={() => setModalOpen(false)}
            >
              No
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Header;

Header.propTypes = {
  docName: PropTypes.string,
  handleSave: PropTypes.func,
  setSearchInput: PropTypes.func,
};
