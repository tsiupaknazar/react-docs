import { Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogOutModal = ({handleOpen, handleClose, }) => {
    const navigate = useNavigate();
  return (
    <Modal
      open={handleOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="absolute top-[50%] left-[50%] w-[auto] p-6 border-2 bg-white shadow-lg rounded-xl"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <p className="font-light">Do you really want to exit?</p>
        <div className="flex items-center justify-around mt-5">
          <button
            onClick={() => {
              navigate("/");
              signOut(auth);
              setUser(null);
            }}
            className="bg-red-500 text-white px-8 py-2 rounded-xl hover:shadow-2xl hover:bg-red-600"
          >
            Yes
          </button>
          <button
            className="bg-white text-blue-500 px-8 py-2 rounded-xl hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            No
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default LogOutModal;
