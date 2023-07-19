import { SaveRounded } from "@mui/icons-material";

const SaveDocBtn = ({ handleSave }) => {
  return (
    <button onClick={handleSave}>
      <SaveRounded
        sx={{
          color: "#4385F3",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          marginRight: "10px",
        }}
        titleAccess="Save Doc"
      />
    </button>
  );
};

export default SaveDocBtn;
