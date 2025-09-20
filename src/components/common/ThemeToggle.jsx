import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="p-3">
      <div
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Sun className="text-3xl text-primary" />
        ) : (
          <Moon className="text-3xl text-primary" />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
