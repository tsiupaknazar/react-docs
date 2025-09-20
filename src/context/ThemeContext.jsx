import { useState, useEffect, createContext } from "react";

const getInitialTheme = () => {
  if (typeof localStorage !== "undefined") {
    const storedPrefs = localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "light";
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const setThemeLocally = (theme) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  useEffect(() => {
    setThemeLocally(theme);
  }, [theme]);

  useEffect(() => {
    if (initialTheme) {
      setTheme(initialTheme);
    }
  }, [initialTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};