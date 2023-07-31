import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="p-3">
      {theme === "dark" ? (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <BsSunFill className="text-3xl" />
        </div>
      ) : (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <BsMoonFill className="text-3xl text-[#242424]" />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
