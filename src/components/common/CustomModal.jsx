import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";

const CustomModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="absolute top-[50%] left-[50%] w-[400px] p-6 bg-primary shadow-lg rounded-xl"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h2 id="modal-modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        {children}
      </Box>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;
