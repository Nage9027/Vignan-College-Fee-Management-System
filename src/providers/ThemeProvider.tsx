import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("system");

  // Load stored theme or system preference
  useEffect(() => {
    const stored = localStorage.getItem("app-theme") as Theme | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const activeTheme = stored ?? "system";
    setThemeState(activeTheme);

    applyTheme(activeTheme, systemDark);
  }, []);

  // Apply theme
  const applyTheme = (theme: Theme, systemDark: boolean) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  };

  const setTheme = (newTheme: Theme) => {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeState(newTheme);
    localStorage.setItem("app-theme", newTheme);
    applyTheme(newTheme, systemDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
