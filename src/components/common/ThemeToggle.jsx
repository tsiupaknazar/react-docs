import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div style={{ padding: "0.75rem" }}>
      <div
        onClick={toggleTheme}
        style={{ cursor: "pointer" }}
      >
        {theme === "dark" ? (
          <Sun style={{ fontSize: "1.8rem", color: "var(--color-text-primary)" }} />
        ) : (
          <Moon style={{ fontSize: "1.8rem", color: "var(--color-text-primary)" }} />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
