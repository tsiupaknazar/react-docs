import { Link } from "react-router-dom";
import { Description } from "@mui/icons-material";
import Search from "./Search";
import SaveDocBtn from "./SaveDocBtn";
import PropTypes from "prop-types";

const HeaderContent = ({
  location,
  docName,
  handleSearchChange,
  handleSave,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center">
        <Link to="/">
          <Description
            sx={{
              color: "#4385F3",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
            alt="Home"
          />
        </Link>
        <h1
          className={`${
            location.pathname === "/"
              ? "hidden md:inline-flex"
              : "md:inline-flex"
          } ml-2 text-primary text-2xl`}
        >
          {location.pathname === "/" ? "Docs" : docName || null}
        </h1>
      </div>
      {location.pathname === "/" && (
        <Search handleSearchChange={handleSearchChange} />
      )}
      <div className="flex items-center gap-2">
        {location.pathname !== "/" && <SaveDocBtn handleSave={handleSave} />}
      </div>
    </div>
  );
};

HeaderContent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  docName: PropTypes.string,
  handleSearchChange: PropTypes.func,
  handleSave: PropTypes.func,
};

export default HeaderContent;
