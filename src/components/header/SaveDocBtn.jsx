import { IoSaveSharp } from "react-icons/io5";

import PropTypes from "prop-types";

const SaveDocBtn = ({ handleSave }) => {
  return (
    <button onClick={handleSave} className="p-3">
      <IoSaveSharp style={{
          color: "#4385F3",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}/>
    </button>
  );
};

export default SaveDocBtn;

SaveDocBtn.propTypes = {
  handleSave: PropTypes.func.isRequired,
}
