import { SaveRounded } from "@mui/icons-material";
import PropTypes from "prop-types";

const SaveDocBtn = ({ handleSave }) => {
  return (
    <button onClick={handleSave} className="p-3">
      <SaveRounded
        sx={{
          color: "#4385F3",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
        titleAccess="Save Doc"
      />
    </button>
  );
};

export default SaveDocBtn;

SaveDocBtn.propTypes = {
  handleSave: PropTypes.func.isRequired,
}
