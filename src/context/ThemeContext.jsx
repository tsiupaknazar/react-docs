import { useState, useEffect, createContext } from "react";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
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

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!theme) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    //test
    // console.log("Applied theme:", theme, root.className);

    localStorage.setItem("color-theme", theme);
  }, [theme]);

  if (!theme) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
