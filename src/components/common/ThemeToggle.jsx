import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="p-3">
      <div
        className={`flex items-center cursor-pointer ${
          theme === "dark" ? "" : "text-[#242424]"
        }`}
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <BsSunFill className="text-3xl" />
        ) : (
          <BsMoonFill className="text-3xl text-[#242424]" />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
