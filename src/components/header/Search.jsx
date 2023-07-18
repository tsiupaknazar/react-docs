import React from "react";
import {Search as SearchIcon} from "@mui/icons-material"

const Search = () => {
  return (
    <div className="md:mx-20 mx-8 w-full flex-shrink flex md:flex-grow items-center px-5 py-3 rounded-xl border-2 border-input focus-within:text-gray-600 focus-within:shadow-md">
      <SearchIcon className="text-primary" />
      <input
        type="text"
        placeholder="Search..."
        className="text-primary bg-transparent outline-none md:px-5 px-2 border-0 md: flex-grow text-base"
      />
    </div>
  );
};

export default Search;